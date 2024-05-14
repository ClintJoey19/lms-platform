"use client";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import MuxPlayer from "@mux/mux-player-react";
import { Pencil, PlusCircle, Video } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import FileUpload from "../global/FileUpload";
import { updateChapter } from "@/lib/actions/chapter.actions";

interface MuxData {
  assetId: string;
  playbackId: string;
}

interface ChapterVideoFormProps {
  initialData: {
    videoUrl: string;
    muxData: MuxData;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  videoUrl: z.string(),
});

const ChapterVideoForm = ({
  initialData,
  courseId,
  chapterId,
}: ChapterVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await updateChapter(courseId, chapterId, "videoUrl", values.videoUrl);
      toast.success("Chapter video updated");
      setIsEditing(false);
    } catch (error: any) {
      console.error(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter Video
        <Button variant="ghost" onClick={toggleEdit}>
          {isEditing && <>Cancel</>}
          {!isEditing && initialData.videoUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit video
            </>
          )}
          {!isEditing && !initialData.videoUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add video
            </>
          )}
        </Button>
      </div>
      {!isEditing && !initialData.videoUrl && (
        <div className="h-60 flex justify-center items-center bg-slate-200 rounded-md">
          <Video />
        </div>
      )}
      {!isEditing && initialData.videoUrl && (
        <div className="relative aspect-video mt-2 rounded-md overflow-hidden">
          <MuxPlayer playbackId={initialData.muxData.playbackId} />
        </div>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="chapterVideo"
            onChange={(url) => {
              if (url) {
                onSubmit({ videoUrl: url });
              }
            }}
          />
          <div className="mt-2">
            <p className="text-sm text-slate-700">
              Upload this chapter&apos;s video
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChapterVideoForm;
