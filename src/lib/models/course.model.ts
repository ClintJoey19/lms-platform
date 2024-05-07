import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 1,
      max: 30,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    price: {
      type: Number || null,
    },
    categories: {
      type: String,
    },
    attachments: {
      type:
        [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attachment",
          },
        ] || null,
    },
    chapters: {
      type:
        [
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
          },
        ] || null,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Course =
  mongoose.models?.Course || mongoose.model("Course", courseSchema);
