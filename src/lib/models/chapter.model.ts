import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      min: 1,
      required: true,
    },
    description: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    muxData: {},
  },
  { timestamps: true }
);

export const Chapter =
  mongoose.models?.Chapter || mongoose.model("Chapter", chapterSchema);
