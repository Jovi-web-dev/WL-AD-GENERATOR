const express = require("express");
const { requireAuth, requireAdmin } = require("../middleware/auth");
const { getOverview } = require("../services/adminService");

const router = express.Router();

router.get("/overview", requireAuth, requireAdmin, async (req, res, next) => {
  try {
    res.json(await getOverview());
  } catch (err) {
    next(err);
  }
});

module.exports = router;
