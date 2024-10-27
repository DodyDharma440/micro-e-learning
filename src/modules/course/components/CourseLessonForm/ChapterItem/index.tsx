import React from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";

import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";

import { AlertDialog, EmptyPlaceholder } from "@/common/components";
import { useDisclosureData } from "@/common/hooks";
import { useDeleteLesson } from "@/modules/course/actions";
import type { ICourseLesson } from "@/modules/course/interfaces";
import { type ICourseChapter } from "@/modules/course/interfaces";

import LessonForm from "../LessonForm";
import LessonItem from "../LessonItem";

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
  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<ICourseLesson | null>();

  const { mutate: deleteLesson, isPending: isLoadingDelete } = useDeleteLesson({
    onSuccess: () => {
      onUpdateChapters((prev) => {
        const index = prev.findIndex((c) => c.id === chapter.id);
        prev[index] = {
          ...prev[index],
          lessons: prev[index].lessons.filter((l) => l.id !== deleteData?.id),
        };
        return [...prev];
      });
      closeDelete();
    },
  });

  const handleDelete = () => {
    deleteLesson({ id: deleteData?.id ?? "" });
  };

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
          {chapter.lessons.length ? (
            <div className="flex flex-col gap-2 mb-4">
              {chapter.lessons.map((lesson) => {
                return (
                  <LessonItem
                    key={lesson.id}
                    lesson={lesson}
                    onDelete={openDelete}
                    onEdit={open}
                  />
                );
              })}
            </div>
          ) : (
            <div className="mb-4">
              <EmptyPlaceholder iconSize={30} message="No lessons yet" />
            </div>
          )}
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

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={isLoadingDelete ? () => {} : closeDelete}
        title="Delete Lesson"
        message="Are you sure want to delete this lesson?"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        color="danger"
        onCancel={isLoadingDelete ? () => {} : closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ isLoading: isLoadingDelete }}
      />
    </>
  );
};

export default ChapterItem;
