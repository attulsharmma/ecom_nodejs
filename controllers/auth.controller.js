import User from "../models/User.js";
import CryptoJS from "crypto-js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { messages } from "../constants.js";
dotenv.config();
const { AUTH_PASSWORD_SECRET, JWT_SECRET } = process.env;
export const registerUser = async (req, res, next) => {
  const { email, password, username } = req.body;
  const newUser = new User({
    username,
    email,
    password: CryptoJS.AES.encrypt(password, AUTH_PASSWORD_SECRET),
  });
  try {
    const savedUser = await newUser.save();
    res.json({ message: "user created", user: savedUser });
  } catch (error) {
    if (error) {
      if (error.name === "MongoError" && error.code === 11000) {
        return res
          .status(422)
          .send({ succes: false, message: "User already exist!" });
      }
      return res.status(422).send({ status: false, message: error.message });
    }
  }
};
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    const { password: OriginalPassword, ...rest } = user._doc;
    !user &&
      res.status(401).json({ message: messages.NOT_AUTHORIZED, status: false });
    const hashedPassword = CryptoJS.AES.decrypt(
      OriginalPassword,
      AUTH_PASSWORD_SECRET
    );
    const passwordDecrypted = hashedPassword.toString(CryptoJS.enc.Utf8);
    if (passwordDecrypted !== password) {
      res.status(401).json({ message: messages.NOT_AUTHORIZED, status: false });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET,
      { expiresIn: "3d" }
    );
    res
      .status(200)
      .json({ message: "login success", user: rest, token: accessToken });
  } catch (error) {
    if (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
};
