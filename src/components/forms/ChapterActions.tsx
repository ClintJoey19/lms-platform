"use client";
import { Button } from "@/components/ui/button";
import { updateChapter } from "@/lib/actions/chapter.actions";
import { Trash } from "lucide-react";
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

      // delete the chapter

      // redirect the page to the course

      toast.success("Chapter is deleted");
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
