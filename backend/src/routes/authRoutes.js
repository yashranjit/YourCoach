import express from "express";

import bcrypt from "bcrypt";
import { jwtSecret } from "../config/processEnv.js";
import jwt from "jsonwebtoken";
import { signUpSchema } from "../validators/authSchema.js";
import { UserModel } from "../models/User.js";
import { signUp, signIn } from "../controllers/authController.js";
const authRouter = express.Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/sign-in", signIn);

export { authRouter };
