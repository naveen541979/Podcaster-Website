import mongoose from "mongoose";

const PodcastSchema = new mongoose.Schema(
  {
    frontImage: {
      type: String,
      required: true,
    },
    audioFile: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

export const Podcast = mongoose.model("Podcast", PodcastSchema);
