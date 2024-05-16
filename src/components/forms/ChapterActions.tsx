"use client";
import { Button } from "@/components/ui/button";
import { deleteChapter, updateChapter } from "@/lib/actions/chapter.actions";
import { getCourse, updateCourse } from "@/lib/actions/course.action";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const value = isPublished ? false : true;

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await updateChapter(courseId, chapterId, "isPublished", value);
      toast.success("Chapter is published");
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      // delete the chapter from the course's chapters
      const course = await getCourse(courseId);

      if (!course) {
        throw new Error("Course not found");
      }

      const newChapters = course.chapters.filter(
        (chapter: string) => chapter !== chapterId
      );

      await updateCourse(courseId, "chapters", newChapters);

      // delete the chapter
      await deleteChapter(chapterId);

      // redirect the page to the course
      toast.success("Chapter is deleted");
      router.replace(`/teacher/courses/${courseId}`);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        size="sm"
        variant={isPublished ? "secondary" : "default"}
        disabled={!disabled || isPublishing}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button size="sm" variant="destructive" onClick={handleDelete}>
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ChapterActions;
