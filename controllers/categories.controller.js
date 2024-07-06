import Categories from "../models/Categories.js";
import { findDocumentById } from "../utils/helper.js";
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.find({});
    res.status(200).json({ success: true, data: categories });
  } catch (error) {}
};
export const getSingleCategory = async (req, res) => {
  try {
    const { _id } = req.query;
    const category = await findDocumentById(_id, Categories, "Category");

    if (!category) {
      res.status(404).json({ success: false, message: "Category not found." });
    } else {
      res.status(200).json({ success: true, data: category });
    }
  } catch (error) {
    if (error) {
      res.status(500).json({
        success: false,
        message: error.message || "Something went wrong.",
      });
    }
  }
};
export const createNewCategory = async (req, res) => {
  try {
    const { name, parentId } = req.body;
    const newCategory = new Categories({ name, parentId });
    await newCategory.save();
    res.status(201).json({
      success: true,
      message: "Category saved successfully.",
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || "Something went wrong!!",
    });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const { _id, ...updatedFields } = req.body;
    const category = await Categories.findById(_id);
    if (!category) {
      res.status(404).json({ status: false, message: "Category not found" });
    } else {
      const updatedCategory = await Categories.findByIdAndUpdate(
        _id,
        {
          $set: updatedFields,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ status: true, data: updatedCategory });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || "Something went wrong!!",
    });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const { _id } = req.query;
    const category = await Categories.findById(_id);
    if (!category) {
      res.status(404).json({ status: false, message: "Category not found" });
    } else {
      await Categories.findByIdAndDelete(_id);
      res
        .status(200)
        .json({ status: true, message: "Category deleted successfully" });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message || "Something went wrong!!",
    });
  }
};
