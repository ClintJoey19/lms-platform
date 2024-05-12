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
import { PlusCircle } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { addChapter, updateCourse } from "@/lib/actions/course.action";
import { Input } from "@/components/ui/input";
import { createChapter } from "@/lib/actions/chapter.actions";
import { useRouter } from "next/navigation";

interface ChapterFormProps {
  initialData: {
    chapters: string[] | null;
  };
  courseId: string;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "Chapter title is required" }),
});

const ChapterForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
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
    }
  };

  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
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
                Add
              </Button>
            </div>
          </form>
        </Form>
      )}
      {!isEditing &&
      (!initialData.chapters || initialData.chapters.length === 0) ? (
        <p className="text-sm text-slate-500 italic my-2">No chapters.</p>
      ) : (
        <div>
          {initialData.chapters?.map((chapter) => (
            <p key={chapter} onClick={() => onEdit(chapter)}>
              {chapter}
            </p>
          ))}
        </div>
      )}
      {!isEditing && (
        <p className="text-sm text-slate-700">Drag & drop to reorder</p>
      )}
    </div>
  );
};

export default ChapterForm;
