import mongoose from "mongoose";

const DeepWorkSessionSchema = new mongoose.Schema(
  {
    // This userId will be relating to the user
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // The goal - this is what the user sets before clicking Lock-In
    goal: {
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      deepWorkDuration: { type: Number, required: true },
      breakDuration: { type: Number, required: true },
    },
    // example:
    // timeline:[{type:"WORK",duration:25, completedAt:8:15 }, {..}]
    // prathi break and prathi work session ni ee timeline array loki push chesthadhi
    //
    timeline: [
      {
        type: { type: String, enum: ["WORK", "BREAK"] },
        duration: Number, // this tells how long a break or work lasted
        completedAt: { type: Date, default: Date.now },
      },
    ],
    // Session active ga undha leka complete aindha
    // session details chepthadhi status
    status: {
      type: String,
      enum: ["ACTIVE", "COMPLETED", "ABORTED"],
      default: "ACTIVE",
    },

    totalWorkMinutes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const DeepWorkSessionModel = mongoose.model(
  "DeepWorkSession",
  DeepWorkSessionSchema,
);
export { DeepWorkSessionModel };
