import { Router } from "express";
import { addNewCartiItem } from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { extractUserId } from "../middlewares/extractUserId.js";

const cartRouter = Router();

// cartRouter.get("/getAllCategories", verifyToken, getAllCategories);
// cartRouter.get("/getCategoryById", verifyToken, getSingleCategory);
cartRouter.post("/addCartItems", verifyToken, extractUserId, addNewCartiItem);
// cartRouter.put("/updateCategory", verifyToken, updateCategory);
// cartRouter.put("/deleteCategory", verifyToken, deleteCategory);

export default cartRouter;
