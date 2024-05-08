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
import Combobox from "@/components/ui/combobox";

interface CategoryFormProps {
  initialData: {
    category: string;
  };
  courseId: string;
}

const choices = [
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "education",
    label: "Education",
  },
  {
    value: "agriculture",
    label: "Agriculture",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "design",
    label: "Arts & Design",
  },
  {
    value: "engineering",
    label: "Engineering",
  },
];

const formSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
});

const CategoryForm = ({ initialData, courseId }: CategoryFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const selectedOption = choices.find(
    (choice) => choice.value === initialData.category
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateCourse(courseId, "category", values.category);

      toast.success("Course category updated");
      setIsEditing(false);
    } catch (err: any) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Category
        <Button variant="ghost" onClick={toggleEdit}>
          {!isEditing ? (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          ) : (
            <>Cancel</>
          )}
        </Button>
      </div>
      {!isEditing ? (
        <p
          className={`text-sm mt-2 ${
            !initialData.category && "text-slate-500 italic"
          }`}
        >
          {selectedOption?.label || "No category."}
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Combobox choices={choices} {...field} label="category" />
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
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  );
};

export default CategoryForm;
