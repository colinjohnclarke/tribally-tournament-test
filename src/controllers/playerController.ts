import {
  createPlayerService,
  getPlayerService,
  updatePlayerResultService,
} from "../services/playerService";

import { Request, Response } from "express";

export const createPlayerController = async (req: Request, res: Response) => {
  const { playerName, email, password } = req.body;

  if (!playerName || !email || !password) {
    console.log(req.body);
    return res.status(400).json({
      message: "Bad Request. Name, email and password details required",
    });
  }

  try {
    const result = await createPlayerService(playerName, email, password);
    return res
      .status(201)
      .json({ message: `Created. Player registered successfully`, result });
  } catch (error) {
    return res.status(500).json({
      message: `Internal Server Error. Player registered unsuccessfully`,
      error,
    });
  }
};

export const getPlayerController = async (req: Request, res: Response) => {
  const playerId: string = req.query.playerId as string;

  try {
    const player = await getPlayerService(playerId);
    return res
      .status(200)
      .json({ message: `OK. Player(s) data found`, player });
  } catch (error) {
    return res.status(404).json({ message: `Not Found. Error finding player` });
  }
};

export const updatePlayerController = async (req: Request, res: Response) => {
  const { matchDetails } = req.body;

  try {
    const playerUpated = await updatePlayerResultService(matchDetails);

    return res
      .status(200)
      .json({ message: `OK. Player updated succesfully`, playerUpated });
  } catch (e) {
    return res
      .status(500)
      .json({ message: `Internal Server Error. Player not updated`, e });
  }
};
