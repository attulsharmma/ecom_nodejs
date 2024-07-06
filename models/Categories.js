import mongoose from "mongoose";
const CategoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Categories",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Categories", CategoriesSchema);
