import React from "react";
import {
  HiOutlineDocument,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { HiOutlineTv } from "react-icons/hi2";
import { RxDragHandleDots2 } from "react-icons/rx";

import { Button } from "@nextui-org/react";

import { useDragDrop } from "@/common/hooks";
import type { ICourseLesson } from "@/modules/course/interfaces";

const ITEM_TYPE = "course-lesson";

type LessonItemProps = {
  lesson: ICourseLesson;
  onDelete: (data: ICourseLesson) => void;
  onEdit: (data: ICourseLesson) => void;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  chapterId: string;
};

const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  onDelete,
  onEdit,
  chapterId,
  index,
  moveItem,
}) => {
  const { ref, preview, handlerId, opacity, cursor } =
    useDragDrop<HTMLDivElement>({
      index,
      itemType: `${ITEM_TYPE}-${chapterId}`,
      onMove: moveItem,
    });

  return (
    <div
      style={{ opacity }}
      ref={preview}
      data-handler-id={handlerId}
      className="rounded-lg flex gap-4 items-center border border-gray-400 dark:border-gray-800 px-4 py-3"
    >
      <div
        className="flex items-center justify-center"
        style={{ cursor }}
        ref={ref}
      >
        <RxDragHandleDots2 size={20} />
      </div>

      {lesson.lessonType === "DOCUMENT" ? (
        <HiOutlineDocument size={24} />
      ) : null}
      {lesson.lessonType === "VIDEO" ? <HiOutlineTv size={24} /> : null}

      <div className="flex-1">
        <p className="font-semibold">{lesson.name}</p>
        <p className="text-xs text-opacity-20 capitalize">
          {lesson.lessonType?.toLowerCase()}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button isIconOnly onClick={() => onEdit(lesson)}>
          <HiOutlinePencil />
        </Button>
        <Button color="danger" isIconOnly onClick={() => onDelete(lesson)}>
          <HiOutlineTrash />
        </Button>
      </div>
    </div>
  );
};

export default LessonItem;
