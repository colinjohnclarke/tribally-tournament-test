import Player from "../../models/Player";
import { IPlayer, IPlayerUpdateResult } from "../../models/Player";
import { IMatchUpdate } from "../../models/Matchup";

// Create player in repo

export const createPlayerRepository = async (
  playerName: string,
  email: string,
  hashedPassword: string
) => {
  const newUser = <IPlayer>{
    playerName,
    email,
    password: hashedPassword,
  };

  try {
    const player = await Player.create(newUser);
    return player;
  } catch (error) {
    return error;
  }
};

// Get one player in repo
export const getPlayerRepository = async (playerId: string) => {
  try {
    const player = await Player.findById({ _id: playerId });
    return player;
  } catch (error) {
    return error;
  }
};

// Get All players in repo

export const getAllPlayersRepository = async () => {
  try {
    const players = await Player.find();
    return players;
  } catch (error) {
    return error;
  }
};

// update player after new matchUp data

export const updatePlayerResultRepository = async (
  matchDetails: IMatchUpdate

  // using the same interface for updating match and player
) => {
  const { result, winner, loser, draw, matchUpId } = matchDetails;

  if (!draw) {
    try {
      const updateWinner = await Player.updateOne(
        { _id: winner },
        {
          $inc: { "outcomes.win": 1 },
          $push: { matchUps: matchUpId },
        }
      );

      const updateLoser = await Player.updateOne(
        { _id: loser },
        {
          $inc: { "outcomes.lose": 1 },
          $push: { matchUps: matchUpId },
        }
      );

      return [updateWinner, updateLoser];
    } catch (e) {
      return e;
    }
  } else {
    try {
      const updatePlayers = await Player.updateMany(
        { _id: { $in: [winner, loser] } },
        {
          $inc: { "outcomes.draw": 1 },
          $push: { matchUps: matchUpId },
        }
      );
      return updatePlayers;
    } catch (e) {
      return e;
    }
  }
};
