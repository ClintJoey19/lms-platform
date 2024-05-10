"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageIcon, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addAttachment, updateCourse } from "@/lib/actions/course.action";
import Image from "next/image";
import FileUpload from "../global/FileUpload";
import { createAttachment } from "@/lib/actions/attachment.actions";

interface Attachment {
  name: string;
  fileUrl: string;
}

interface AttachmentFormProps {
  initialData: {
    attachments: Attachment[] | null;
  };
  courseId: string;
}

const formSchema = z.object({
  name: z.optional(z.string().or(z.undefined())),
  fileUrl: z.string(),
});

const AttachmentForm = ({ initialData, courseId }: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, fileUrl } = values;

    try {
      // save first the data to attachment and return the id
      const attachment = await createAttachment(name, fileUrl);

      // get the id and update the attachments of the course by it's courseId
      await addAttachment(courseId, attachment._id);

      toast.success("Course attachment updated");
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
      (!initialData.attachments || initialData.attachments?.length === 0) ? (
        <p className="text-sm text-slate-500 italic mt-2">No attachments.</p>
      ) : (
        <FileUpload
          endpoint="courseAttachments"
          onChange={(url) => {
            if (url) {
              const fileName = url.split("/").pop();
              onSubmit({ name: fileName, fileUrl: url });
            }
          }}
        />
      )}
    </div>
  );
};

export default AttachmentForm;
