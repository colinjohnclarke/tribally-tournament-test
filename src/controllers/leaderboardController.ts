import { Request, Response } from "express";
import { leaderboardService } from "../services/leaderboardService";

export const leaderboardController = async (req: Request, res: Response) => {
  const tournamentId: string = req.query.tournamentId as string;

  if (!tournamentId) {
    return res
      .status(400)
      .json({ message: "Bad Request. Tournament Id required" });
  } else {
    try {
      const result = await leaderboardService(tournamentId);
      return res.status(200).json({ message: "OK", result });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server error, not able to find leaderboard",
        e,
      });
    }
  }
};
