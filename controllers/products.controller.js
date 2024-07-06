import Products from "../models/Products.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json({ status: true, data: products });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Products.findById(req.query._id);
    if (!product) {
      return res
        .status(404)
        .json({ status: false, message: "Product not found" });
    } else res.status(200).json({ status: true, data: product });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};
export const createNewProduct = async (req, res) => {
  const { title, description, price, category, image, rating } = req.body;
  const newProduct = new Products({
    title,
    description,
    price,
    category,
    image,
    rating,
  });
  try {
    await newProduct.save();
    res
      .status(201)
      .json({ status: true, messages: "Product created successfully" });
  } catch (error) {
    if (error) {
      if (error) {
        return res.status(500).json({ status: false, message: error.message });
      }
    }
  }
};
export const updateProduct = async (req, res) => {
  const { _id, ...updatedFields } = req.body;
  const product = await Products.findById(_id);
  if (!product) {
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  } else {
    const updatedProduct = await Products.findByIdAndUpdate(
      _id,
      { $set: updatedFields },
      { new: true }
    );
    res.status(200).json({ status: true, updatedProduct });
  }
};
export const deleteProduct = async (req, res) => {
  const { _id } = req.query;
  const product = await Products.findById(_id);
  console.log(product);
  if (!product) {
    return res
      .status(404)
      .json({ status: false, message: "Product not found" });
  } else await Products.findByIdAndDelete(_id);
  res
    .status(200)
    .json({ status: true, message: "Product deleted successfully" });
};
