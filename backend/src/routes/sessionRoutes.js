import express from "express";
import { userAuth } from "../middleware/userAuth.js";
import {
  startSession,
  logCycle,
  endSession,
} from "../controllers/sessionController.js";
const sessionRouter = express.Router();

// when the user clicks "Lock In" we call this route
//  and create the session goal in the DB.
sessionRouter.post("/start", userAuth, startSession);

// This route will be automatically called by the react
// when the Time Cycle finshes
// e.g., "work timer done" or "break timer done"

sessionRouter.put("/log-cycle", userAuth, logCycle);

// this route has to be called when yser clicks stop or when the end time is reached.

sessionRouter.put("/end", userAuth, endSession);
export { sessionRouter };
