import React from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import type { ICourseChapter } from "@/modules/course/interfaces";

type ChapterItemProps = {
  index: number;
  chapter: ICourseChapter;
  onDelete: (data: ICourseChapter) => void;
  onEdit: (data: ICourseChapter) => void;
};

const ChapterItem: React.FC<ChapterItemProps> = ({
  onDelete,
  onEdit,
  chapter,
}) => {
  return (
    <Card isBlurred>
      <CardHeader className="px-6 py-4">
        <div className="flex items-center gap-4 w-full">
          <p className="font-semibold text-lg flex-1">{chapter.name}</p>
          <div className="flex items-center gap-2">
            <Button isIconOnly onClick={() => onEdit(chapter)}>
              <HiOutlinePencil />
            </Button>
            <Button color="danger" isIconOnly onClick={() => onDelete(chapter)}>
              <HiOutlineTrash />
            </Button>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className="px-6 py-4">
        <Button
          color="primary"
          variant="light"
          className="w-full"
          startContent={<HiPlus />}
        >
          Add Lesson
        </Button>
      </CardBody>
    </Card>
  );
};

export default ChapterItem;
