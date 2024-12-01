import { Router } from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password/:token", resetPassword);

export default authRouter;
