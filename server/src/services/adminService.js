const { pool } = require("../db/pool");

async function getOverview() {
  const [users, generations, assets, credits] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS total FROM users"),
    pool.query("SELECT COUNT(*)::int AS total FROM generations"),
    pool.query("SELECT COUNT(*)::int AS total FROM generation_assets"),
    pool.query("SELECT COALESCE(SUM(credits_used), 0)::int AS total FROM users")
  ]);

  return {
    users: users.rows[0].total,
    generations: generations.rows[0].total,
    assets: assets.rows[0].total,
    creditsUsed: credits.rows[0].total
  };
}

module.exports = { getOverview };
