import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    min: 1,
    max: 30,
    required: true,
  },
  description: {
    type: String,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
});

export const Chapter =
  mongoose.models?.Chapter || mongoose.model("Chapter", chapterSchema);
