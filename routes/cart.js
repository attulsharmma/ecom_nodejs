import { Router } from "express";
import {
  addNewCartItem,
  deleteCartItem,
  viewCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { extractUserId } from "../middlewares/extractUserId.js";

const cartRouter = Router();

cartRouter.get("/getAllCartItems", verifyToken, extractUserId, viewCartItem);

cartRouter.post("/addCartItems", verifyToken, extractUserId, addNewCartItem);

cartRouter.delete(
  "/deleteCartItem",
  verifyToken,
  extractUserId,
  deleteCartItem
);

export default cartRouter;
