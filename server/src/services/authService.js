const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/pool");
const { getUsage } = require("./usageService");
const { DEFAULT_TIER_ID, TIERS } = require("../config/tiers");

function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === "production") throw new Error("JWT_SECRET precisa estar configurado em produção.");
  return "development-only-unsafe-secret";
}

// Normaliza o plano lido do banco para um dos ids conhecidos.
// Protege a UI de valores legados como 'Premium Pro'.
function normalizePlan(rawPlan) {
  const key = String(rawPlan || "").toLowerCase().trim();
  return TIERS[key] ? key : DEFAULT_TIER_ID;
}

function publicUser(user, usage = null) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    plan: normalizePlan(user.plan),
    credits_total: user.credits_total,
    credits_used: user.credits_used,
    daily_used: usage?.daily_used ?? 0,
    monthly_used: usage?.monthly_used ?? 0,
  };
}

async function publicUserWithUsage(user) {
  const usage = await getUsage(user.id);
  return publicUser(user, usage);
}

function signUser(user) {
  return jwt.sign({ sub: user.id, role: user.role }, getJwtSecret(), { expiresIn: "7d" });
}

async function registerUser({ name, email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  if (!name || !normalizedEmail || !password || password.length < 8) {
    const err = new Error("Informe nome, e-mail e senha com pelo menos 8 caracteres.");
    err.status = 400;
    throw err;
  }

  const count = await pool.query("SELECT COUNT(*)::int AS total FROM users");
  const role = count.rows[0].total === 0 ? "admin" : "user";
  const passwordHash = await bcrypt.hash(password, 12);

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name.trim(), normalizedEmail, passwordHash, role]
    );
    const user = result.rows[0];
    // Usuario recem-criado nao tem geracoes, pula query de usage.
    return { user: publicUser(user), token: signUser(user) };
  } catch (err) {
    if (err.code === "23505") {
      const duplicate = new Error("Este e-mail já está cadastrado.");
      duplicate.status = 409;
      throw duplicate;
    }
    throw err;
  }
}

async function loginUser({ email, password }) {
  const normalizedEmail = String(email || "").trim().toLowerCase();
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [normalizedEmail]);
  const user = result.rows[0];
  const ok = user && await bcrypt.compare(password || "", user.password_hash);
  if (!ok) {
    const err = new Error("E-mail ou senha inválidos.");
    err.status = 401;
    throw err;
  }
  return { user: await publicUserWithUsage(user), token: signUser(user) };
}

async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  if (!result.rows[0]) return null;
  return publicUserWithUsage(result.rows[0]);
}

function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}

module.exports = { registerUser, loginUser, findUserById, verifyToken };
