import bcrypt from "bcrypt";
import { IPlayerUpdateResult } from "../../models/Player";
import { IMatchUpdate } from "../../models/Matchup";

import {
  createPlayerRepository,
  getPlayerRepository,
  getAllPlayersRepository,
  updatePlayerResultRepository,
} from "../repository/playerRespository";

const saltRounds = 10;

export const createPlayerService = async (
  playerName: string,
  email: string,
  password: string
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await createPlayerRepository(
    playerName,
    email,
    hashedPassword
  );

  return result;
};

export const getPlayerService = async (playerId: string) => {
  if (playerId) {
    const getPlayer = await getPlayerRepository(playerId);
    return getPlayer;
  } else {
    const getAllPlayers = getAllPlayersRepository();
    return getAllPlayers;
  }
};

// update player after new matchUp data

export const updatePlayerResultService = async (matchDetails: IMatchUpdate) => {
  const updatedPlayer = await updatePlayerResultRepository(matchDetails);
  return updatedPlayer;
};

// export interface IPlayerUpdateResult {
//   playerId: string;
//   matchUpId: string;
//   matchUpResult: "win" | "lose" | "draw";
// }
