import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { messages } from "../constants.js";
dotenv.config();
const { JWT_SECRET } = process.env;
export const extractUserId = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, JWT_SECRET);
    req.userId = decodedToken.id;
    next();
  } catch (error) {
    res.status(401).json({ message: messages.NOT_AUTHORIZED });
  }
};
