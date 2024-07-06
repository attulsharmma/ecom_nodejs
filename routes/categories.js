import { Router } from "express";
import {
  createNewCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/categories.controller.js";

const categoriesRouter = Router();

categoriesRouter.get("/getAllCategories", getAllCategories);
categoriesRouter.get("/getCategoryById", getSingleCategory);
categoriesRouter.post("/createCategory", createNewCategory);
categoriesRouter.put("/updateCategory", updateCategory);
categoriesRouter.put("/deleteCategory", deleteCategory);

export default categoriesRouter;
