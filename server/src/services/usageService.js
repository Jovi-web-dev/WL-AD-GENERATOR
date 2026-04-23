const { pool } = require("../db/pool");

// Retorna quantos anuncios (generations) o usuario ja gerou hoje e no mes corrente.
// Usa created_at com AT TIME ZONE 'UTC' — na Etapa 3 consideraremos o timezone do user.
async function getUsage(userId) {
  const result = await pool.query(
    `SELECT
       COUNT(*) FILTER (WHERE created_at >= date_trunc('day', NOW()))::int AS daily_used,
       COUNT(*) FILTER (WHERE created_at >= date_trunc('month', NOW()))::int AS monthly_used
     FROM generations
     WHERE user_id = $1`,
    [userId]
  );
  return {
    daily_used: result.rows[0]?.daily_used ?? 0,
    monthly_used: result.rows[0]?.monthly_used ?? 0,
  };
}

module.exports = { getUsage };
