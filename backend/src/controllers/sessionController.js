import { DeepWorkSessionModel } from "../models/DeepWorkSession.js";
export const startSession = async (req, res) => {
  try {
    const { startTime, endTime, deepWorkDuration, breakDuration } = req.body;
    const newSession = await DeepWorkSessionModel.create({
      userId: req.userId,
      goal: {
        startTime,
        endTime,
        deepWorkDuration,
        breakDuration,
      },
      status: "ACTIVE",
    });
    // returned session Id, it can be used for updates
    res.status(201).json({
      message: "Lock In Successful! Deep Work started.",
      sessionId: newSession._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Error starting session." });
  }
};

export const logCycle = async (req, res) => {
  try {
    // type and duration are objs of timeline[]
    // type can be "WORK" or "BREAK"
    // duration is a number
    const { sessionId, type, duration } = req.body;
    const session = await DeepWorkSessionModel.findById(sessionId);
    // if there is no session found
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    // if there is a session push type and duration to timeline[]
    // this timeline push will be helpful in the end when we want to check breaks and work sessions
    // this will return an array
    session.timeline.push({ type, duration });
    // if type is "WORK" then add duration to totalWorkMinutes
    // in the end if we want ro check how many minutes we worked this will be helpful
    if (type === "WORK") {
      session.totalWorkMinutes += duration;
    }
    await session.save();
    res.json({ message: "Cycle logged" });
  } catch (err) {
    res.status(500).json({ message: "Error logging cycle." });
  }
};

export const endSession = async (req, res) => {
  try {
    const { sessionId, status } = req.body;
    await DeepWorkSessionModel.findByIdAndUpdate(sessionId, { status });
    if (status === "COMPLETED") {
      return res.json({ message: "Great job! Session finished" });
    } else {
      return res.json({ message: "You aborted the session. " });
    }
  } catch (err) {
    res.status(500).json({ message: "Error ending session." });
  }
};
