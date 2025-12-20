import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/processEnv.js";

export function userAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const tokenString = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(tokenString, jwtSecret);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
}
/*
  first imported requried package and keys
  took the token from request headers - authorization
  if token is not present it responds with 401 - it tells req lacks auth credentials
  if the token is present :
      from the token we saved from req headers we squeeze out the original token if bearer is attched
      or else just save it in tokenString variable
      now we verify it using the verify() of jsonwebtoken lib
      if token is verified and no issues are there then we attach id from decoded token to req.userId
      if errors are present we respond with 403 - forbidden (i identify u but u need permission)

*/
