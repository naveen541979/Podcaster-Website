import express from "express";
import { Addcategory, getAllCategories } from "../controller/category.controller.js";

const router = express.Router();

router.post("/add-category", Addcategory);
router.get("/all", getAllCategories);

export default router;
