"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
// app.use(cors(corsOptions)); // corss orginin resource sharing
app.get("/", (req, res) => {
    res.send("Hello, World22!");
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


