"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import toast from "react-hot-toast";
import { createCourse } from "@/lib/actions/course.action";

const formSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
});

const page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const res = await createCourse(values.title);

      toast.success("Course Created");
      router.push(`/teacher/courses/${res._id}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
      <div className="w-full">
        <h1 className="text-2xl">Name your Course</h1>
        <p className="text-sm text-slate-600">
          What would you like to name your course? Don&apos;t worry, you can
          change this later
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 mt-8 w-full"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={isSubmitting}
                    placeholder="e.g Advanced Web Development"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  What will you teach in this course?
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            <Button asChild variant="ghost" type="button">
              <Link href="/teacher/courses">Cancel</Link>
            </Button>
            <Button type="submit" disabled={!isValid || isSubmitting}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
