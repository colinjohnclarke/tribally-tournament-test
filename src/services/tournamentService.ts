import {
  createTournamentRespository,
  updateTournamentRespository,
  getTournamentRespository,
  getAllTournamentsRespository,
} from "../repository/tournamentRepository";
import { ITournament } from "../../models/Tournament";

export const createTournamentService = async (tournamentDate: string) => {
  const result = await createTournamentRespository(tournamentDate);
  return result;
};

// gets one tournament of specific id if provided, if not all tournaments returned
export const getTournamentService = async (tournamentId: string) => {
  if (tournamentId) {
    try {
      const tournament = await getTournamentRespository(tournamentId);
      return tournament;
    } catch (e) {
      return e;
    }
  } else {
    try {
      const allTournaments = await getAllTournamentsRespository();
      return allTournaments;
    } catch (e) {
      return e;
    }
  }
};

export const updateTournamentService = async (tournamentDetails: any) => {
  const result = await updateTournamentRespository(tournamentDetails);
  return result;
};
