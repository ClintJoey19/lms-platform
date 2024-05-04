import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      require: true,
      min: 1,
      max: 30,
    },
    description: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
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
