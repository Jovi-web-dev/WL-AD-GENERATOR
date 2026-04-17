const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { pool } = require("../db/pool");

function getJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === "production") throw new Error("JWT_SECRET precisa estar configurado em produção.");
  return "development-only-wl-importados-secret";
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    plan: user.plan,
    credits_total: user.credits_total,
    credits_used: user.credits_used
  };
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
  return { user: publicUser(user), token: signUser(user) };
}

async function findUserById(id) {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] ? publicUser(result.rows[0]) : null;
}

function verifyToken(token) {
  return jwt.verify(token, getJwtSecret());
}

module.exports = { registerUser, loginUser, findUserById, verifyToken };
