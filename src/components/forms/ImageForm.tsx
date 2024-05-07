"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateCourse } from "@/lib/actions/course.action";
import Image from "next/image";
import FileUpload from "../global/FileUpload";

interface ImageFormProps {
  initialData: {
    imageUrl: string;
  };
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string(),
});

const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
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
        Course Image
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add image
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
          endpoint="courseImage"
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

export default ImageForm;
