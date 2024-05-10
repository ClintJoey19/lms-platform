import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Attachment =
  mongoose.models?.Attachment || mongoose.model("Attachment", attachmentSchema);
