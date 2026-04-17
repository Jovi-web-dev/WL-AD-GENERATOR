const express = require("express");
const path = require("path");
const fs = require("fs");
const { initDb } = require("./db/init");
const authRoutes = require("./routes/authRoutes");
const generationRoutes = require("./routes/generationRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();
const port = Number(process.env.PORT || 5000);
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json({ limit: "8mb" }));
app.use("/uploads", express.static(path.resolve("server/uploads")));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "wl-importados-platform" });
});

app.use("/api/auth", authRoutes);
app.use("/api/generations", generationRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/admin", adminRoutes);
app.use(errorHandler);

async function attachFrontend() {
  if (isProduction) {
    const dist = path.resolve("dist");
    app.use(express.static(dist));
    app.use((req, res) => res.sendFile(path.join(dist, "index.html")));
    return;
  }

  const { createServer } = await import("vite");
  const vite = await createServer({
    server: { middlewareMode: true, host: "0.0.0.0", allowedHosts: true },
    appType: "custom"
  });

  app.use(vite.middlewares);
  app.use(async (req, res, next) => {
    if (req.originalUrl.startsWith("/api")) return next();
    try {
      const url = req.originalUrl;
      let template = fs.readFileSync(path.resolve("index.html"), "utf8");
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    } catch (err) {
      vite.ssrFixStacktrace(err);
      next(err);
    }
  });
}

initDb()
  .then(attachFrontend)
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`WL Importados full-stack app running on port ${port}`);
    });
  })
  .catch(err => {
    console.error("Failed to start application", err);
    process.exit(1);
  });
