"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const dbConnect_1 = __importDefault(require("../config/dbConnect"));
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
// app.use(cors(corsOptions)); // corss orginin resource sharing
app.get("/", (req, res) => {
    res.send("Hello, World22!");
});
app.use("/players", require("../routes/api/playerRoutes"));
app.use("/matchups", require("../routes/api/matchupRoutes"));
app.use("/tournaments", require("../routes/api/tournamentRoutes"));
app.use("/leaderboards", require("../routes/api/leaderboardRoutes"));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, dbConnect_1.default)();
