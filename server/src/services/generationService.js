const { pool } = require("../db/pool");
const { generateTextContent } = require("./ai/textService");
const { generateMedia } = require("./ai/mediaService");
const { getUsage } = require("./usageService");
const { getTier } = require("../config/tiers");

async function createGeneration(user, input) {
  const productName = String(input.productName || "").trim();
  if (!productName) {
    const err = new Error("Nome do produto é obrigatório.");
    err.status = 400;
    throw err;
  }

  // Cota por tier: diaria E mensal precisam estar dentro do limite.
  const tier = getTier(user.plan);
  const usage = await getUsage(user.id);

  if (usage.daily_used >= tier.dailyQuota) {
    const err = new Error(
      `Limite diario do plano ${tier.label} atingido (${tier.dailyQuota}/dia). Tente novamente amanha ou faca upgrade.`
    );
    err.status = 429;
    throw err;
  }

  if (usage.monthly_used >= tier.monthlyQuota) {
    const err = new Error(
      `Limite mensal do plano ${tier.label} atingido (${tier.monthlyQuota}/mes). Aguarde o proximo ciclo ou faca upgrade.`
    );
    err.status = 429;
    throw err;
  }

  const result = await generateTextContent({ ...input, productName });
  const inserted = await pool.query(
    `INSERT INTO generations (user_id, product_name, category, tone, marketplaces, input, result, status)
     VALUES ($1, $2, $3, $4, $5, $6, $7, 'completed') RETURNING *`,
    [user.id, productName, input.category || null, input.tone || null, JSON.stringify(input.marketplaces || []), input, result]
  );

  // credits_used legado (mantido ate Etapa 3 formalizar o modelo).
  await pool.query("UPDATE users SET credits_used = credits_used + 1 WHERE id = $1", [user.id]);
  await pool.query(
    "INSERT INTO credit_transactions (user_id, amount, reason, metadata) VALUES ($1, $2, $3, $4)",
    [user.id, -1, "generation:text", { generationId: inserted.rows[0].id }]
  );
  await pool.query(
    "INSERT INTO api_usage_logs (user_id, provider, operation, status, credits, metadata) VALUES ($1, $2, $3, $4, $5, $6)",
    [user.id, process.env.ANTHROPIC_API_KEY ? "anthropic" : "local", "text-generation", "completed", 1, { generationId: inserted.rows[0].id }]
  );

  return { id: inserted.rows[0].id, ...result };
}

async function listGenerations(user) {
  const result = await pool.query(
    "SELECT id, product_name, category, tone, status, result, created_at FROM generations WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50",
    [user.id]
  );
  return result.rows;
}

async function createMedia(user, input) {
  const media = await generateMedia(input);
  const generationId = input.generationId || null;

  for (const image of media.images || []) {
    await pool.query(
      "INSERT INTO generation_assets (generation_id, user_id, type, url, prompt, metadata) VALUES ($1, $2, $3, $4, $5, $6)",
      [generationId, user.id, "image", image.url, image.prompt, { label: image.type, generated: image.generated }]
    );
  }

  if (media.video) {
    await pool.query(
      "INSERT INTO generation_assets (generation_id, user_id, type, url, prompt, metadata) VALUES ($1, $2, $3, $4, $5, $6)",
      [generationId, user.id, "video", media.video.url, media.video.prompt, { duration: media.video.duration, generated: media.video.generated }]
    );
  }

  await pool.query(
    "INSERT INTO api_usage_logs (user_id, provider, operation, status, credits, metadata) VALUES ($1, $2, $3, $4, $5, $6)",
    [user.id, "media-pipeline", "media-generation", "completed", 0, { generationId }]
  );

  return media;
}

module.exports = { createGeneration, listGenerations, createMedia };
