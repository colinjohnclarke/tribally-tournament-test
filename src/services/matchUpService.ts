import {
  createMatchUpRepository,
  getAllMatchUpRespository,
  getMatchUpRespository,
  updateMatchUpResultRepository,
} from "../repository/matchUpRepository";
import { updatePlayerResultRepository } from "../repository/playerRespository";

import { IMatchUpdate } from "../../models/Matchup";

// creates a new match up

export const createMatchUpService = async (
  date: string,
  player1: string,
  player2: string
) => {
  const createMatch = await createMatchUpRepository(date, player1, player2);

  return createMatch;
};

// gets one matchup of specific id if provided, if not all matchups returned
export const getMatchUpService = async (matchUpId: string) => {
  if (matchUpId) {
    try {
      const match = await getMatchUpRespository(matchUpId);
      return match;
    } catch (e) {
      return e;
    }
  } else {
    try {
      const allMatchUps = await getAllMatchUpRespository();
      return allMatchUps;
    } catch (e) {
      return e;
    }
  }
};

//updates matchup with result data
// calls update updatePlayerResultRepository and updates player result with appropriate results


export const updateMatchUpResultService = async (
  matchDetails: IMatchUpdate
) => {
  const updatedMatch = await updateMatchUpResultRepository(matchDetails);
  const updatePlayer = await updatePlayerResultRepository(matchDetails);

  return [updatedMatch, updatePlayer];
};

