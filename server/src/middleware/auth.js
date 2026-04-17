const { findUserById, verifyToken } = require("../services/authService");

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) return res.status(401).json({ error: "Autenticação necessária." });

    const decoded = verifyToken(token);
    const user = await findUserById(decoded.sub);
    if (!user) return res.status(401).json({ error: "Usuário não encontrado." });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Sessão inválida ou expirada." });
  }
}

function requireAdmin(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Acesso restrito ao administrador." });
  next();
}

module.exports = { requireAuth, requireAdmin };
