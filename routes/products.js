import { Router } from "express";
import {
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  createNewProduct,
} from "../controllers/products.controller.js";

const productRouter = Router();

//Get All Products
productRouter.get("/getAllProducts", getAllProducts);
//Get Single Product
productRouter.get("/getProductById", getSingleProduct);
//Create Product
productRouter.post("/createProduct", createNewProduct);
//Update Product
productRouter.put("/updateProduct", updateProduct);
//Delete Product
productRouter.delete("/deleteProduct", deleteProduct);

export default productRouter;
