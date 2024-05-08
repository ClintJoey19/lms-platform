import { Button } from "@/components/ui/button";
import { getCourses } from "@/lib/actions/course.action";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

interface Course {
  _id: string;
  userId: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  category: string;
  attachments: any;
  chapters: any;
  isPublished: boolean;
}

const page = async () => {
  const { userId } = await auth();
  const courses = await getCourses(userId);

  return (
    <div className="flex flex-col gap-y-2 p-6">
      <div>
        <Button asChild>
          <Link href="/teacher/create">New Course</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3">
        {courses.map((course: Course) => (
          <Link key={course._id} href={`/teacher/courses/${course._id}`}>
            {course.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
