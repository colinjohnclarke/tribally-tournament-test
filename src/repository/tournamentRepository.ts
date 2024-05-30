import { ITournament } from "../../models/Tournament";
import Tournament from "../../models/Tournament";

// create tournament

export const createTournamentRespository = async (tournamentDate: string) => {
  const newDate = {
    date: tournamentDate,
  };

  try {
    const result = await Tournament.create(newDate);
    return result;
  } catch (e) {
    return e;
  }
};

export const getTournamentRespository = async (tournamentId: string) => {
  try {
    const tournament = await Tournament.findById({ _id: tournamentId });
    return tournament;
  } catch (e) {
    return e;
  }
};

export const getAllTournamentsRespository = async () => {
  try {
    const tournament = await Tournament.find();
    return tournament;
  } catch (e) {
    return e;
  }
};

export const updateTournamentRespository = async (tournamentDetails: any) => {
  const { tournamentId, matchUpIds } = tournamentDetails;

  try {
    const tournament = await Tournament.findById({ _id: tournamentId });

    let newIds: string[] = [];

    for (let index = 0; index < matchUpIds.length; index++) {
      if (!tournament?.matchUps?.includes(matchUpIds[index])) {
        newIds.push(matchUpIds[index]);
      }
    }
    const result = await Tournament.findByIdAndUpdate(
      tournamentId,
      {
        $push: {
          matchUps: { $each: newIds },
        },
      },
      { new: true }
    );

    return result;
  } catch (e) {
    return e;
  }
};
