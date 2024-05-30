import mongoose, { Schema, Types } from "mongoose";

export interface IMatchUp {
  matchUpId: Types.ObjectId;
  date: string;
  player1: string;
  player2: string;
  status: "pending" | "void" | "completed";
  result?: string;
  winner?: string;
  loser?: string;
  draw?: boolean;
}

export interface IMatchUpdate {
  status: "pending" | "void" | "completed";
  result: string;
  winner: string;
  loser: string;
  draw: boolean;
  matchUpId: string;
}

const matchUpSchema: Schema = new Schema({
  matchUpId: { type: Types.ObjectId },
  date: { type: String, required: true },
  player1: { type: String, required: true },
  player2: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "void", "completed"],
    required: true,
  },
  result: { type: String },
  winner: { type: String },
  loser: { type: String },
  draw: { type: Boolean },
});

export default mongoose.model("MatchUp", matchUpSchema);
