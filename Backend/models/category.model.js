import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true,
  },
  podcasts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
    },
  ],
}, { timestamps: true });

export const Category = mongoose.model("Category", categorySchema);
