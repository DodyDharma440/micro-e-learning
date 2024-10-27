import React from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { useDisclosureData } from "@/common/hooks";
import type { ICourseLesson } from "@/modules/course/interfaces";
import { type ICourseChapter } from "@/modules/course/interfaces";

import LessonForm from "../LessonForm";

type ChapterItemProps = {
  index: number;
  chapter: ICourseChapter;
  onDelete: (data: ICourseChapter) => void;
  onEdit: (data: ICourseChapter) => void;
  onUpdateChapters: React.Dispatch<React.SetStateAction<ICourseChapter[]>>;
};

const ChapterItem: React.FC<ChapterItemProps> = ({
  onDelete,
  onEdit,
  chapter,
  onUpdateChapters,
}) => {
  const [isOpenLesson, { open, close }, lessonData] =
    useDisclosureData<ICourseLesson | null>();

  return (
    <>
      <Card isBlurred>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <p className="font-semibold text-lg flex-1">{chapter.name}</p>
            <div className="flex items-center gap-2">
              <Button isIconOnly onClick={() => onEdit(chapter)}>
                <HiOutlinePencil />
              </Button>
              <Button
                color="danger"
                isIconOnly
                onClick={() => onDelete(chapter)}
              >
                <HiOutlineTrash />
              </Button>
            </div>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="px-6 py-4">
          {chapter.lessons.map((lesson) => {
            return <div key={lesson.id}>{lesson.name}</div>;
          })}
          <Button
            color="primary"
            variant="light"
            className="w-full"
            startContent={<HiPlus />}
            onClick={() => open(null)}
          >
            Add Lesson
          </Button>
        </CardBody>
      </Card>

      <LessonForm
        isOpen={isOpenLesson}
        onClose={close}
        chapter={chapter}
        lesson={lessonData}
        onSuccess={(data, action) => {
          switch (action) {
            case "update":
              onUpdateChapters((prev) => {
                if (lessonData) {
                  const indexChapter = prev?.findIndex(
                    (c) => c.id === chapter?.id
                  );
                  const lessons = prev[indexChapter].lessons;
                  const lessonIndex = prev[indexChapter].lessons.findIndex(
                    (l) => l.id === lessonData.id
                  );
                  lessons[lessonIndex] = { ...lessonData, ...data };
                  prev[indexChapter] = { ...prev[indexChapter], lessons };
                }
                return [...prev];
              });
              break;
            case "create":
              onUpdateChapters((prev) => {
                const indexChapter = prev?.findIndex(
                  (c) => c.id === chapter?.id
                );
                prev[indexChapter] = {
                  ...prev[indexChapter],
                  lessons: [...prev[indexChapter].lessons, data],
                };

                return [...prev];
              });
              break;
          }
        }}
      />
    </>
  );
};

export default ChapterItem;
