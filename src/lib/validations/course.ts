"use server";

import { connectToDB } from "../mongoose";

export const createCourse = async () => {
  try {
    connectToDB();
  } catch (err: any) {
    console.error(err.message);
  }
};
