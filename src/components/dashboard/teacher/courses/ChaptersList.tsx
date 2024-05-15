"use client";

import { useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { cn } from "@/lib/utils";
import { GripVertical, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Chapter {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  isPublished: boolean;
  isFree: boolean;
  muxData: object;
}

interface ChaptersListProps {
  onEdit: (id: string) => void;
  onReorder: (updatedChapters: string[]) => void;
  items: Chapter[];
}

const ChaptersList = ({ onEdit, onReorder, items }: ChaptersListProps) => {
  const [chapters, setChapters] = useState(items);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(chapters);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);

    setChapters(items);

    const updatedIds = items.map((item) => item._id);
    onReorder(updatedIds);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter._id}
                index={index}
                draggableId={chapter._id}
              >
                {(provided) => (
                  <div
                    className={cn(
                      "flex items-center gap-x-2 bg-slate-200",
                      chapter.isPublished &&
                        "bg-sky-100 border-sky-200 text-sky-700"
                    )}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 border-r-slate-200 hover:bg-slate-300 rounded-l-md transition",
                        chapter.isPublished && "border-sky-200 hover:bg-sky-200"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <GripVertical className="h-5 w-5" />
                    </div>
                    <p>{chapter.title}</p>
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && <Badge>Free</Badge>}
                      <Badge
                        className={cn(
                          "bg-slate-500",
                          chapter.isPublished && "bg-sky-700"
                        )}
                      >
                        {chapter.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Pencil
                        onClick={() => onEdit(chapter._id)}
                        className="h-4 w-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ChaptersList;
