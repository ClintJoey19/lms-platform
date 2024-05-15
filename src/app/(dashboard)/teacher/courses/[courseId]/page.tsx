import IconBadge from "@/components/global/IconBadge";
import { getCourse } from "@/lib/actions/course.action";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";
import { redirect } from "next/navigation";
import TitleForm from "@/components/forms/TitleForm";
import DescriptionForm from "@/components/forms/DescriptionForm";
import ImageForm from "@/components/forms/ImageForm";
import CategoryForm from "@/components/forms/CategoryForm";
import PriceForm from "@/components/forms/PriceForms";
import AttachmentForm from "@/components/forms/AttachmentForms";
import { getAttachment } from "@/lib/actions/attachment.actions";
import ChapterForm from "@/components/forms/ChapterForm";
import { getChapter } from "@/lib/actions/chapter.actions";
import Banner from "@/components/global/Banner";
import CourseActions from "@/components/forms/CourseActions";

const page = async ({ params }: { params: { courseId: string } }) => {
  const course = await getCourse(params.courseId);

  if (!course) return redirect("/teacher/courses");

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.category,
    course.chapters,
  ];

  let courseAttachments = [];
  let courseChapters = [];

  if (course) {
    // atachments
    for (const attachment of course.attachments) {
      const res = await getAttachment(attachment);
      courseAttachments.push(res);
    }

    // chapters
    for (const chapter of course.chapters) {
      const res = await getChapter(chapter);
      courseChapters.push(res);
    }
  }

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter((field) => {
    return Array.isArray(field) ? field.length > 0 : Boolean(field);
  }).length;

  const isCompleted = completedFields === totalFields;

  return (
    <>
      {course.isPublished ? (
        <Banner label="This course is published." variant="success" />
      ) : (
        <Banner label="This course is not published yet." />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-2xl font-medium">Course Setup</h1>
              <span className="text-sm text-slate-700">
                Completed Fields: ({completedFields}/{totalFields})
              </span>
            </div>
          </div>
          <CourseActions
            disabled={isCompleted}
            courseId={params.courseId}
            isPublished={course.isPublished}
          />
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
            <CategoryForm initialData={course} courseId={params.courseId} />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Course chapters</h2>
              </div>
              <ChapterForm
                initialData={course}
                courseId={params.courseId}
                chapters={courseChapters}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={CircleDollarSign} />
                <h2 className="text-xl">Sell your course</h2>
              </div>
              <div>
                <PriceForm initialData={course} courseId={params.courseId} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">Resources & Attachments</h2>
              </div>
              <div>
                <AttachmentForm
                  initialData={course}
                  courseId={params.courseId}
                  courseAttachments={courseAttachments}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
