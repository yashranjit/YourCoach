import { UserModel } from "../models/User.js";
import { signUpSchema } from "../validators/authSchema.js";
import { jwtSecret } from "../config/processEnv.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const signUp = async (req, res) => {
  const parsedData = signUpSchema.safeParse(req.body);
  if (!parsedData.success) {
    return res
      .status(411)
      .json({ message: "Incorrect Format", error: parsedData.error });
  }
  const { fullname, email, password } = parsedData.data;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      fullname,
      email,
      password: hashedPassword,
    });
    res.json({ message: "You have signed up! Please proceed to sign in." });
  } catch (err) {
    if (err.code === 11000) {
      res.status(409).json({ message: "User already exists." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const response = await UserModel.findOne({ email });
  if (!response) {
    return res.status(403).json({ message: "Invalid credentials" });
  }
  const passwordMatch = await bcrypt.compare(password, response.password);
  if (passwordMatch) {
    const token = jwt.sign({ id: response._id.toString() }, jwtSecret, {
      expiresIn: "1d",
    });
    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Invalid credentials" });
  }
};

export { signUp, signIn };
