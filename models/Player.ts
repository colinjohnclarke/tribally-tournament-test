import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export interface IPlayer {
  playerName: string;
  email: string;
  password: string;
  outcomes: {
    wins: number;
    losses: number;
    draws: number;
  };
  matchUps: [string];
}

export interface IPlayerUpdateResult {
  playerId: string;
  matchUpId: string;
  matchUpResult: "win" | "lose" | "draw";
}

const playerSchema = new Schema<IPlayer>({
  playerName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  outcomes: {
    win: { type: Number, default: 0 },
    lose: { type: Number, default: 0 },
    draw: { type: Number, default: 0 },
  },
  matchUps: { type: [String] },
});

export default mongoose.model("Player", playerSchema);
