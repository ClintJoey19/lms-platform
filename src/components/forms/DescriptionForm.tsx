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
import { Pencil } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateCourse } from "@/lib/actions/course.action";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
  initialData: {
    description: string;
  };
  courseId: string;
}

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

const DescriptionForm = ({ initialData, courseId }: DescriptionFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse(courseId, "description", values.description);

      toast.success("Course description updated");
      setIsEditing(false);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Description
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit description
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={`text-sm mt-2 ${
            !initialData.description && "text-slate-500 italic"
          }`}
        >
          {initialData.description || "No description."}
        </p>
      ) : (
        <>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 mt-4"
            >
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="e.g 'This course is about...'"
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
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default DescriptionForm;
