import {
  createMatchUpService,
  getMatchUpService,
  updateMatchUpResultService,
} from "../services/matchUpService";

import { Request, Response } from "express";

export const createMatchUpController = async (req: Request, res: Response) => {
  const { date, player1, player2 } = req.body;

  if (!date || !player1 || !player2) {
    return res
      .status(400)
      .json({ message: "Bad Request. Date and two player Id's required" });
  }

  try {
    const result = await createMatchUpService(date, player1, player2);
    return res
      .status(201)
      .json({ message: `Created. Matchup registered successfully`, result });
  } catch (e) {
    return res.status(500).json({
      message: `Internal Server Error. Matchup registered unsuccessfully`,
      e,
    });
  }
};

export const getMatchUpController = async (req: Request, res: Response) => {
  const matchUpId: string = req.query.matchUpId as string;

  try {
    const matchup = await getMatchUpService(matchUpId);

    if (!matchup) {
      return res.status(404).json({ message: "Not Found. No match up found" });
    } else {
      return res
        .status(200)
        .json({ message: "OK. Matchup found successfully", matchup });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Server error", e });
  }
};

export const updateMatchUpController = async (req: Request, res: Response) => {
  const { matchDetails } = req.body;

  console.log("matchDetails", matchDetails);

  if (!matchDetails) {
    return res
      .status(400)
      .json({ message: "Bad Request. Details not provided" });
  }

  if (
    matchDetails.matchUpId === undefined ||
    matchDetails.status === undefined ||
    matchDetails.result === undefined ||
    matchDetails.winner === undefined ||
    matchDetails.loser === undefined ||
    matchDetails.draw === undefined
  ) {
    return res.status(400).json({
      message:
        "Bad Request. All details are required to update the result of the match",
    });
  }

  try {
    // updates Match and Player docs
    const updatedMatchUp = await updateMatchUpResultService(matchDetails);

    return res
      .status(201)
      .json({ message: "OK. Matchup updated successfully", updatedMatchUp });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error", error: e });
  }
};
