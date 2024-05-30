import { tournamentLeaderboardRepository } from "../repository/leaderboardRespository";

export const leaderboardService = async (tournamentId: string) => {
  const leaderboardData = await tournamentLeaderboardRepository(tournamentId);
  return leaderboardData;
};
