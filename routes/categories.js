import { Router } from "express";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categories.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const categoriesRouter = Router();

categoriesRouter.get("/getAllCategories", verifyToken, getAllCategories);
categoriesRouter.get("/getCategoryById", verifyToken, getSingleCategory);
categoriesRouter.post("/createCategory", verifyToken, createNewCategory);
categoriesRouter.put("/updateCategory", verifyToken, updateCategory);
categoriesRouter.put("/deleteCategory", verifyToken, deleteCategory);

export default categoriesRouter;
