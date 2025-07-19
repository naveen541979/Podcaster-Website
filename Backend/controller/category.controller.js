import {asyncHandler} from "../utils/asyncHandler.js";  
import { Category } from "../models/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const Addcategory = asyncHandler(async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required" });
  }

  const existing = await Category.findOne({ categoryName });
  if (existing) {
    return res.status(409).json({ message: "Category already exists" });
  }

  const category = await Category.create({ categoryName });
  return res.status(200).json(new ApiResponse(200, category, "Category added"));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().select("categoryName");
  return res.status(200).json(new ApiResponse(200, categories, "Fetched categories"));
});
