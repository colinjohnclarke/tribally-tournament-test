"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const whitelist = ["http://localhost:3600"];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            console.log("not allowed by Cors");
        }
    },
    optionsSuccessStatus: 200,
};
exports.default = corsOptions;
