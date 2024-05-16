"use server";

import { revalidatePath } from "next/cache";
import { Course } from "../models/course.model";
import { connectToDB } from "../mongoose";
import { auth } from "@clerk/nextjs/server";
import { parseJSON } from "../utils";

export const getCourses = async (userId: string | null) => {
  try {
    connectToDB();

    let courses = null;

    if (userId) {
      courses = await Course.find({ userId: userId });
      return parseJSON(courses);
    }

    courses = await Course.find();
    return parseJSON(courses);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const getCourse = async (id: string) => {
  try {
    connectToDB();

    const course = await Course.findById(id);

    if (!course) {
      console.log("Course not found");
    }

    return parseJSON(course);
  } catch (err: any) {
    console.error(err.message);
  }
};

export const createCourse = async (title: string) => {
  try {
    connectToDB();

    const { userId } = auth();

    const newCourse = new Course({
      userId: userId,
      title: title,
      description: "",
      imageUrl: "",
      price: null,
      category: "",
      attachments: null,
      chapters: null,
      isPublished: false,
    });

    const res = await newCourse.save();

    revalidatePath("/teacher/courses");
    return parseJSON(res);
  } catch (err: any) {
    console.error(err.message);
  }
};

export const updateCourse = async (id: string, key: string, value: any) => {
  try {
    connectToDB();

    await Course.findByIdAndUpdate(id, {
      [key]: value,
    });

    revalidatePath(`/teacher/courses/${id}`);
  } catch (err: any) {
    console.error(err.message);
  }
};

export const addAttachment = async (id: string, attachmentId: string) => {
  try {
    connectToDB();

    const course = await Course.findById(id);

    const res = await Course.findByIdAndUpdate(id, {
      attachments: course.attachments
        ? [...course.attachments, attachmentId]
        : [attachmentId],
    });

    revalidatePath(`/teacher/courses/${id}`);
    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const addChapter = async (id: string, chapterId: string) => {
  try {
    connectToDB();

    const course = await Course.findById(id);

    if (!course) {
      throw new Error("Course not found");
    }

    const res = await Course.findByIdAndUpdate(id, {
      chapters: course.chapters ? [...course.chapters, chapterId] : [chapterId],
    });

    revalidatePath(`/teacher/courses/${id}`);
    return parseJSON(res);
  } catch (error: any) {
    console.error(error.message);
  }
};

export const deleteCourse = async (id: string) => {
  try {
    connectToDB();

    await Course.findByIdAndDelete(id);
  } catch (error: any) {
    console.error(error.message);
  }
};
