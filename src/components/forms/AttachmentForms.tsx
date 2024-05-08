"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateCourse } from "@/lib/actions/course.action";
import Image from "next/image";
import FileUpload from "../global/FileUpload";

interface AttachmentFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string(),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse(courseId, "imageUrl", values.imageUrl);

      toast.success("Course image updated");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course attachments
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add file
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="h-60 flex justify-center items-center bg-slate-200 rounded-md">
            <ImageIcon />
          </div>
        ) : (
          <div className="relative aspect-video mt-2 rounded-md overflow-hidden">
            <Image
              src={initialData.imageUrl}
              alt="course image"
              fill
              className="object-cover"
            />
          </div>
        ))}
      {isEditing && (
        <FileUpload
          endpoint="courseAttachments"
          onChange={(url) => {
            if (url) {
              onSubmit({ imageUrl: url });
            }
          }}
        />
      )}
    </div>
  );
};

export default AttachmentForm;
