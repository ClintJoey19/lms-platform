"use server";
import { revalidatePath } from "next/cache";
import { Course } from "../models/course.model";
import { connectToDB } from "../mongoose";
import { auth } from "@clerk/nextjs/server";
import { parseJSON } from "../utils";

interface Course {
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  categories: [] | null;
  attachments: [] | null;
  isPublished: boolean;
}

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

    await newCourse.save();

    revalidatePath("/teacher/courses");
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

    revalidatePath(`/teacher/course/${id}`);
  } catch (err: any) {
    console.error(err.message);
  }
};
