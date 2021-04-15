const express = require("express");
const router = express.Router();
const controller = require("../controllers/score.controller");

router.post("/saveScore", controller.saveScore);

router.get("/getRank/:id", controller.getRankByLessonId)

module.exports = router;
