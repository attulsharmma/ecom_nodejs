import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createNewProduct,
} from "../controllers/products.controller.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const productRouter = Router();

//Get All Products
productRouter.get("/getAllProducts", verifyToken, getAllProducts);
//Get Single Product
productRouter.get("/getProductById", verifyToken, getSingleProduct);
//Create Product
productRouter.post("/createProduct", verifyToken, createNewProduct);
//Update Product
productRouter.put("/updateProduct", verifyToken, updateProduct);
//Delete Product
productRouter.delete("/deleteProduct", verifyToken, deleteProduct);

export default productRouter;
