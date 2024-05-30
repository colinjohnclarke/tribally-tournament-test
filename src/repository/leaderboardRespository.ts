import Matchup from "../../models/Matchup";
import Tournament from "../../models/Tournament";
import Player from "../../models/Player";

export const tournamentLeaderboardRepository = async (tournamentId: string) => {
  const tournament: any = await Tournament.findById(tournamentId);

  if (!tournament) {
    return null;
  }

  if (tournament) {
    const matchups: any = tournament?.matchUps;

    let matchupArr: any = [];

    for (let index = 0; index < matchups?.length; index++) {
      const matchupId = matchups[index];

      try {
        const matchup = await Matchup.findById(matchupId);
        if (matchup) {
          matchupArr.push(matchup);
        } else return null;
      } catch (e) {
        return e;
      }
    }
    const leaderboardVals = getLeaderboardVals(matchupArr);

    const leaderboardWithNames: any = [];

    for (let index = 0; index < leaderboardVals.length; index++) {
      const playerName = await findPlayerName(leaderboardVals[index].player);

      leaderboardWithNames.push({
        playerName,
        playerId: leaderboardVals[index].player,
        points: leaderboardVals[index].points,
      });
    }
    return leaderboardWithNames.sort((a: any, b: any) => b.points - a.points);
  }
};

export const getLeaderboardVals = (matchupArr: any) => {
  const players: string[] = [];

  for (let index = 0; index < matchupArr.length; index++) {
    if (!players.includes(matchupArr[index].player1)) {
      players.push(matchupArr[index].player1);
    }

    if (!players.includes(matchupArr[index].player2)) {
      players.push(matchupArr[index].player2);
    }
  }

  let playerResArr = players.map((str) => ({ player: str, points: 0 }));

  for (let index = 0; index < matchupArr.length; index++) {
    if (matchupArr[index].status === "completed" && !matchupArr[index].draw) {
      const winner = matchupArr[index].winner;

      for (let i = 0; i < playerResArr.length; i++) {
        if (playerResArr[i].player === winner) {
          playerResArr[i].points += 3;
        }
      }
    } else if (matchupArr[index].draw) {
      for (let index = 0; index < playerResArr.length; index++) {
        if (
          playerResArr[index].player === matchupArr[index].player1 ||
          playerResArr[index].player === matchupArr[index].player2
        ) {
          playerResArr[index].points += 1;
        }
      }
    }
  }
  return playerResArr;
};

const findPlayerName = async (playerId: string) => {
  try {
    const player = await Player.findById(playerId);
    return player?.playerName;
  } catch (e) {
    return e;
  }
};
