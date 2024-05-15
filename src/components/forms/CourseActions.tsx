"use client";
import { Button } from "@/components/ui/button";
import { updateCourse } from "@/lib/actions/course.action";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

interface CourseActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const CourseActions = ({
  disabled,
  courseId,
  isPublished,
}: CourseActionsProps) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const value = isPublished ? false : true;

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      await updateCourse(courseId, "isPublished", value);
      toast.success("Course is published");
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
        variant={isPublished ? "default" : "secondary"}
        disabled={!disabled}
        onClick={handlePublish}
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <Button
        size="sm"
        variant="destructive"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        <Trash className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default CourseActions;
