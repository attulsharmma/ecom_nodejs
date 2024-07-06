import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";

// import userRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/products.js";
import categoriesRouter from "./routes/categories.js";

const app = express();
// var jsonParser = bodyParser.json()

dotenv.config();

const { MONGODB_URL_LOCAL, PORT } = process.env;
//DB CONNECTION
mongoose
  .connect(MONGODB_URL_LOCAL)
  .then(() => console.log("Db Connected"))
  .catch((err) => console.log(err));

// var urlencodedParser = bodyParser.urlencoded({ extended: false })
//API CALLS
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/ecom/api/v1/",userRouter)
app.use("/ecom/api/v1/", authRouter);
app.use("/ecom/api/v1/", productRouter);
app.use("/ecom/api/v1/", categoriesRouter);

//SERVER RUNNING
app.listen(PORT || 3000, () =>
  console.log(`Server running on PORT:  ${PORT || 3000}`)
);
