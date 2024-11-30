import { Router } from "express";

import {
  registerUser,
  loginUser,
  forgotPassword,
} from "../controllers/auth.controller.js";
// import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;
