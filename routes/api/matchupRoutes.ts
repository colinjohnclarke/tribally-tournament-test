import express from "express";
import {
  getMatchUpController,
  createMatchUpController,
  updateMatchUpController,
} from "../../src/controllers/matchUpController";

const router = express.Router();

router
  .route("/")
  .get(getMatchUpController)
  .post(createMatchUpController)
  .put(updateMatchUpController);
//   .delete(deletePlayerController);

module.exports = router;
