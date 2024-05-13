"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, PlusCircle } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addChapter, updateCourse } from "@/lib/actions/course.action";
import { Input } from "@/components/ui/input";
import { createChapter } from "@/lib/actions/chapter.actions";
import { useRouter } from "next/navigation";
import ChaptersList from "../dashboard/teacher/courses/ChaptersList";

interface Chapter {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
  isFree: boolean;
  muxData: object;
}

interface ChapterFormProps {
  initialData: {
    chapters: string[] | null;
  };
  courseId: string;
  chapters: Chapter[];
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter title is required" }),
});

const ChapterForm = ({ initialData, courseId, chapters }: ChapterFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const chapter = await createChapter(values.title);

      await addChapter(courseId, chapter._id);

      toast.success("Chapter added");
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    } finally {
      setIsEditing(false);
    }
  };

  const onReorder = async (updatedChapters: string[]) => {
    try {
      setIsUpdating(true);

      await updateCourse(courseId, "chapters", updatedChapters);
      toast.success("Chapters reordered");
    } catch (error: any) {
      console.error(error.message);
      toast.error("There was an error in reordering");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4 relative">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 flex items-center justify-center top-0 right-0 rounded-md">
          <Loader2 className="h-6 w-6 animate-spin text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between">
        Course Chapters
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Chapter
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="e.g 'Introduction'"
                      disabled={isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-2">
              {isSubmitting && (
                <LoaderCircle className="h-6 w-6 animate-spin" />
              )}
              <Button type="submit" disabled={!isValid || isSubmitting}>
                Create
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isEditing &&
      (!initialData.chapters || initialData.chapters.length === 0) ? (
        <p className="text-sm text-slate-500 italic mt-2">No chapters.</p>
      ) : (
        !isEditing && (
          <ChaptersList
            onEdit={onEdit}
            onReorder={onReorder}
            items={chapters}
          />
        )
      )}
      {!isEditing && (
        <p className="text-sm text-slate-700 mt-2">Drag & drop to reorder</p>
      )}
    </div>
  );
};

export default ChapterForm;
