import express from "express";
import {
  getPlayerController,
  createPlayerController,
  updatePlayerController,
} from "../../src/controllers/playerController";

const router = express.Router();

router
  .route("/")
  .get(getPlayerController)
  .post(createPlayerController)
  .put(updatePlayerController);

module.exports = router;
