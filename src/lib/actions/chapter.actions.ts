"use server";
import { revalidatePath } from "next/cache";
import { Chapter } from "../models/chapter.model";
import { connectToDB } from "../mongoose";
import { parseJSON } from "../utils";
import { video } from "../mux";

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

    if (key === "videoUrl") {
      const asset = await video.assets.create({
        input: [{ url: value }],
        playback_policy: ["public"],
        test: false,
      });

      await Chapter.findByIdAndUpdate(chapterId, {
        muxData: {
          assetId: asset.id,
          playbackId: asset.playback_ids?.[0]?.id,
        },
      });
    }

    revalidatePath(`/teacher/courses/${courseId}/chapters/${chapterId}`);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteChapter = async (chapterId: string) => {
  try {
    await Chapter.findByIdAndDelete(chapterId);
  } catch (error: any) {
    console.error(error.message);
  }
};
