const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { providerStatus } = require("../services/providerService");

const router = express.Router();

router.get("/providers", requireAuth, (req, res) => {
  res.json({ providers: providerStatus() });
});

module.exports = router;
