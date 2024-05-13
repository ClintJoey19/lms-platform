"use server";

import { revalidatePath } from "next/cache";
import { Chapter } from "../models/chapter.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";

export const getChapter = async (id: string) => {
  try {
    connectToDB();

    const res = await Chapter.findById(id);

    if (!res) {
      throw new Error("No chapter found");
    }

    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const createChapter = async (title: string) => {
  try {
    connectToDB();

    const chapter = new Chapter({
      title,
    });

    await chapter.save();

    return parseJSON(chapter);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const updateChapter = async (
  courseId: string,
  chapterId: string,
  key: string,
  value: any
) => {
  try {
    await Chapter.findByIdAndUpdate(chapterId, {
      [key]: value,
    });

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  } catch (error: any) {
    console.error(error.message);
  }
};
