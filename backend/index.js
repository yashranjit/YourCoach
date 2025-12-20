import "dotenv/config";

import { PORT, dbURL } from "./src/config/processEnv.js";
import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import { authRouter } from "./src/routes/authRoutes.js";
import { sessionRouter } from "./src/routes/sessionRoutes.js";

const app = express();
const port = PORT;
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/session", sessionRouter);

async function main() {
  try {
    await mongoose.connect(dbURL);
    console.log(`Connected to DB`);

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (err) {
    console.log("Error connecting to DB", err);
  }
}

main();
