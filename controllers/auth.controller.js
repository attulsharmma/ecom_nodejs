import User from "../models/User.js";
import jwt from "jsonwebtoken";

import { messages } from "../constants.js";
export const registerUser = async (req, res, next) => {
  const { email, password, username } = req.body;
  const newUser = new User({
    username,
    email,
    password,
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
    if (!user) {
      return res
        .status(401)
        .json({ message: messages.USER_NOT_FOUND, status: false });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials", status: false });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const { password: oPass, ...rest } = user._doc;
    res
      .status(200)
      .json({ message: "Login successful", user: rest, token: accessToken });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: messages.NOT_FOUND, status: false });
    } else {
      await user.generateResetToken();
      // await sendResetEmail(user);
      res.status(200).json({
        message: "Password reset email sent",
        status: true,
        token: user.resetPasswordToken,
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
};
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password, email } = req.body;
  try {
    const user = await User.findOne({
      email,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      res.status(401).json({ message: messages.INVALID_TOKEN, status: false });
    } else {
      user.password = password;
      user.resetPasswordExpires = undefined;
      user.resetPasswordToken = undefined;
      await user.save();
      res.status(200).json({
        message: "Password reset successfully",
        status: true,
      });
    }
  } catch (error) {
    if (error) {
      return res.status(500).json({ status: false, message: error.message });
    }
  }
};
