"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addAttachment, updateCourse } from "@/lib/actions/course.action";
import FileUpload from "../global/FileUpload";
import {
  createAttachment,
  deleteAttachment,
} from "@/lib/actions/attachment.actions";
import { File } from "lucide-react";

interface Attachment {
  _id: string;
  name: string;
  fileUrl: string;
}

interface AttachmentFormProps {
  initialData: {
    attachments: string[] | null;
  };
  courseId: string;
  courseAttachments: Attachment[] | null;
}

const formSchema = z.object({
  name: z.optional(z.string().or(z.undefined())),
  fileUrl: z.string(),
});

const AttachmentForm = ({
  initialData,
  courseId,
  courseAttachments,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { name, fileUrl } = values;

    try {
      const attachment = await createAttachment(name, fileUrl);

      await addAttachment(courseId, attachment._id);

      toast.success("Course attachment updated");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  const onDelete = async (id: string) => {
    try {
      setDeletingId(id);

      const updatedAttachments = initialData.attachments?.filter(
        (attachment) => id !== attachment
      );

      await updateCourse(courseId, "attachments", updatedAttachments);

      await deleteAttachment(id);

      toast.success("Attachment deleted");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setDeletingId(null);
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
        courseAttachments?.map((attachment) => (
          <div
            key={attachment._id}
            className="flex items-center p-3 bg-sky-100 w-full border-sky-200 text-sky-700 rounded-md"
          >
            <File className="h-4 w-4 mr-2 flex-shrink-0" />
            <p className="text-sm line-clamp-1">{attachment.name}</p>
            {deletingId === attachment._id ? (
              <div className="ml-auto">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <button
                className="ml-auto hover:opacity-75 transition"
                onClick={() => onDelete(attachment._id)}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        ))
      )}
      {isEditing && (
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
