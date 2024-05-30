import {
  createTournamentService,
  updateTournamentService,
  getTournamentService,
} from "../services/tournamentService";

import { Request, Response } from "express";



export const getTournamentController = async (req: Request, res: Response) => {
  const tournamentId: string = req.query.tournamentId as string;

  try {
    const tournament = await getTournamentService(tournamentId);

    if (!tournament) {
      return res
        .status(404)
        .json({ message: "Not Found. No tournament found" });
    } else {
      return res
        .status(200)
        .json({ message: "OK. Tournament found successfully", tournament });
    }
  } catch (e) {
    return res.status(500).json({ message: "Internal Server error", e });
  }
};




export const createTournamentController = async (
  req: Request,
  res: Response
) => {
  const { tournamentDate } = req.body;
  console.log("tournamentDate", tournamentDate);

  if (!tournamentDate) {
    return res
      .status(400)
      .json({ message: "Bad Request. Date required to create new tournament" });
  }

  try {
    const result = await createTournamentService(tournamentDate);

    return res
      .status(201)
      .json({ message: `Created. Tournament created successfully`, result });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Internal Server Error. Tournament not created` });
  }
};

export const updateTournamentController = async (
  req: Request,
  res: Response
) => {
  const { tournamentDetails } = req.body;

  if (!tournamentDetails) {
    return res.status(400).json({
      message:
        "Bad Request. Tournament details required to create new tournament",
    });
  }

  try {
    const result = await updateTournamentService(tournamentDetails);
    return res
      .status(200)
      .json({ message: `OK. Tournament updated successfully`, result });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error. Tournament not updated" });
  }
};
