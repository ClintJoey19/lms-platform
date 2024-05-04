import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  const MONGODB_URL = process.env.MONGODB_URL;

  if (!MONGODB_URL) {
    return console.log("Missing MONGODB URL");
  }

  if (isConnected) {
    return console.log("DB is already connected");
  }

  try {
    const res = await mongoose.connect(MONGODB_URL);

    if (res) {
      console.log("Connected to MongoDB");
      isConnected = true;
    }
  } catch (err: any) {
    console.error(err.message);
  }
};
