const express = require("express");
const { requireAuth } = require("../middleware/auth");
const { createGeneration, listGenerations, createMedia } = require("../services/generationService");

const router = express.Router();

router.get("/", requireAuth, async (req, res, next) => {
  try {
    res.json({ generations: await listGenerations(req.user) });
  } catch (err) {
    next(err);
  }
});

router.post("/", requireAuth, async (req, res, next) => {
  try {
    res.json(await createGeneration(req.user, req.body));
  } catch (err) {
    next(err);
  }
});

router.post("/media", requireAuth, async (req, res, next) => {
  try {
    res.json(await createMedia(req.user, req.body));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
