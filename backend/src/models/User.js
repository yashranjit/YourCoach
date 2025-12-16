// this User.js will have the schema for storing user data

const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fullname: { type: String, required: true, trim: true },
    // fullname will be of type string and it is requried, trim is used to remove any extra spaces
    email: {
      type: String,
      required: true,
      unique: true,
      // unique will ensures there will be no same users use same email
      lowercase: true,
      // lowercase will store email in small case
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    // user settings like - user's workduration time, break time will be saved here
    settings: {
      workDuration: {
        type: Number,
        default: 25,
        min: 1, // so the minimum duration is 1 min
      },
      breakDuration: {
        type: Number,
        default: 5,
        min: 1,
      },
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};
