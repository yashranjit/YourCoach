require("dotenv").config();

const { PORT, dbURL } = require("./src/config/processEnv");

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = PORT;
const cors = require("cors");
const { authRouter } = require("./src/routes/authRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", authRouter);

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
