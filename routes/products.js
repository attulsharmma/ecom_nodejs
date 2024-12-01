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

productRouter.get("/getAllProducts", verifyToken, getAllProducts);
productRouter.get("/getProductById", verifyToken, getSingleProduct);
productRouter.post("/createProduct", verifyToken, createNewProduct);
productRouter.put("/updateProduct", verifyToken, updateProduct);
productRouter.delete("/deleteProduct", verifyToken, deleteProduct);
export default productRouter;
