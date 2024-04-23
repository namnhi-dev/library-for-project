import fs from "fs";
import https from "https";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import dBConnect from "./configs/dbConnect.js";
const app = express();

// [Middleware]
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dBConnect();
// [Import Router]
import authRoute from "./routes/authRoute.js";

const PORT = process.env.PORT || 5000;

app.use("/api/users", authRoute);

https
    .createServer(
        {
            key: fs.readFileSync("devlocal.vn+2-key.pem"),
            cert: fs.readFileSync("devlocal.vn+2.pem"),
        },
        app
    )
    .listen(PORT, () => console.log(`Server listening on ${PORT}`));
