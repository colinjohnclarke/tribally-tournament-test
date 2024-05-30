import express from "express";
import {
  createTournamentController,
  updateTournamentController,
  getTournamentController,
} from "../../src/controllers/tournamentController";

const router = express.Router();

router
  .route("/")
  .get(getTournamentController)
  .post(createTournamentController)
  .put(updateTournamentController);

module.exports = router;
