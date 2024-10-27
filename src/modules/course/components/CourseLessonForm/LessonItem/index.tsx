import React from "react";
import {
  HiOutlineDocument,
  HiOutlinePencil,
  HiOutlineTrash,
} from "react-icons/hi";
import { HiOutlineTv } from "react-icons/hi2";

import { Button } from "@nextui-org/react";

import type { ICourseLesson } from "@/modules/course/interfaces";

type LessonItemProps = {
  lesson: ICourseLesson;
  onDelete: (data: ICourseLesson) => void;
  onEdit: (data: ICourseLesson) => void;
};

const LessonItem: React.FC<LessonItemProps> = ({
  lesson,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="rounded-lg flex gap-4 items-center border border-gray-400 dark:border-gray-800 px-4 py-3">
      {lesson.lessonType === "DOCUMENT" ? (
        <HiOutlineDocument size={24} />
      ) : null}
      {lesson.lessonType === "VIDEO" ? <HiOutlineTv size={24} /> : null}

      <div className="flex-1">
        <p className="font-semibold">{lesson.name}</p>
        <p className="text-xs text-opacity-20 capitalize">
          {lesson.lessonType.toLowerCase()}
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
