import MatchUp from "../../models/Matchup";
import { IMatchUp, IMatchUpdate } from "../../models/Matchup";

export const createMatchUpRepository = async (
  date: string,
  player1: string,
  player2: string
) => {
  const status = "pending";
  const newMatchUp = <IMatchUp>{
    date,
    player1,
    player2,
    status,
  };

  try {
    const newMatch = await MatchUp.create(newMatchUp);
    return newMatch;
  } catch (e) {
    return e;
  }
};

export const getMatchUpRespository = async (matchUpId: string) => {
  try {
    const match = await MatchUp.findById({ _id: matchUpId });
    return match;
  } catch (e) {
    return e;
  }
};

export const getAllMatchUpRespository = async () => {
  try {
    const match = await MatchUp.find();
    return match;
  } catch (e) {
    return e;
  }
};

//updates matchup with result data

export const updateMatchUpResultRepository = async (
  matchDetails: IMatchUpdate
) => {
  const { status, result, winner, loser, draw, matchUpId } = matchDetails;

  if (!draw) {
    try {
      const updatedMatchup = await MatchUp.findOneAndUpdate(
        { _id: matchUpId },
        {
          $set: {
            status,
            result,
            winner,
            loser,
            draw,
          },
        },
        { new: true }
      );

      return updatedMatchup;
    } catch (e) {
      return e;
    }
  } else {
    try {
      const updatedMatchup = await MatchUp.findOneAndUpdate(
        { _id: matchUpId },
        {
          $set: {
            status,
            result,
            draw,
          },
        },
        { new: true }
      );
      return updatedMatchup;
    } catch (e) {
      return e;
    }
  }
};
