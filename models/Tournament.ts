import mongoose, { Schema } from "mongoose";

export interface ITournament {
  date: string;
  matchUps?: [string];
}

const tournamentSchema = new Schema<ITournament>({
  date: { type: String, required: true },
  matchUps: { type: [String] },
});

export default mongoose.model("Tournament", tournamentSchema);
