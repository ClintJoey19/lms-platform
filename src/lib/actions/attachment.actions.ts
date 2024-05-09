"use server";

import { revalidatePath } from "next/cache";
import { Attachment } from "../models/attachment.mode";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const createAttachment = async (
  courseId: string,
  name: string,
  fileUrl: string
) => {
  try {
    connectToDB();

    const attachment = new Attachment({
      name,
      fileUrl,
    });

    await attachment.save();

    revalidatePath(`/teacher/courses/${courseId}`);

    return parseJSON(attachment);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getAttachment = async (id: string) => {
  try {
    connectToDB();

    const res = await Attachment.findById(id);

    if (!res) {
      throw new Error("Attachment not found");
    }

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateAttachment = async (id: string) => {
  try {
    connectToDB();

    // pending
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteAttachment = async (id: string) => {
  try {
    connectToDB();

    // pending
  } catch (error: any) {
    console.error(error.message);
  }
};
