import IconBadge from "@/components/global/IconBadge";
import { getCourse } from "@/lib/actions/course.action";
import { LayoutDashboard } from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "@/components/forms/TitleForm";
import DescriptionForm from "@/components/forms/DescriptionForm";
import ImageForm from "@/components/forms/ImageForm";

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourse(params.courseId);

  if (!course) return redirect("/teacher/courses");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categories,
    course.attachments,
    course.chapters,
    course.isPublished,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-2xl font-medium">Course Setup</h1>
          <span className="text-sm text-slate-700">
            Completed Fields: ({completedFields}/{totalFields})
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
        <div>
          <div className="flex items-center gap-x-2">
            <IconBadge icon={LayoutDashboard} />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={params.courseId} />
          <DescriptionForm initialData={course} courseId={params.courseId} />
          <ImageForm initialData={course} courseId={params.courseId} />
        </div>
      </div>
    </div>
  );
};

export default page;
