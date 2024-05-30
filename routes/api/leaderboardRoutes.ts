import express from "express";

import { leaderboardController } from "../../src/controllers/leaderBoardController";

const router = express.Router();

router.route("/").get(leaderboardController);



module.exports = router;
