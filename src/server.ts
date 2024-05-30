import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import corsOptions from "../config/corsOptions";
import cors from "cors";
import connectDB from "../config/dbConnect";

const app = express();
const PORT = process.env.PORT;
app.use(express.json());

// app.use(cors(corsOptions)); // corss orginin resource sharing

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World22!");
});

app.use("/players", require("../routes/api/playerRoutes"));
app.use("/matchups", require("../routes/api/matchupRoutes"));
app.use("/tournaments", require("../routes/api/tournamentRoutes"));

app.use("/leaderboards", require("../routes/api/leaderboardRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectDB();
