import React, { useCallback, useState } from "react";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { HiOutlinePencil } from "react-icons/hi2";
import { RxDragHandleDots2 } from "react-icons/rx";

import { useDidUpdate } from "@mantine/hooks";
import { Button, Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import update from "immutability-helper";

import { AlertDialog, EmptyPlaceholder } from "@/common/components";
import { useDisclosureData, useDragDrop } from "@/common/hooks";
import {
  useDeleteLesson,
  useUpdateLessonOrder,
} from "@/modules/course/actions";
import type { ICourseLesson } from "@/modules/course/interfaces";
import { type ICourseChapter } from "@/modules/course/interfaces";

import LessonForm from "../LessonForm";
import LessonItem from "../LessonItem";

const ITEM_TYPE = "course-chapter";

type ChapterItemProps = {
  index: number;
  chapter: ICourseChapter;
  onDelete: (data: ICourseChapter) => void;
  onEdit: (data: ICourseChapter) => void;
  onUpdateChapters: React.Dispatch<React.SetStateAction<ICourseChapter[]>>;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};

const ChapterItem: React.FC<ChapterItemProps> = ({
  onDelete,
  onEdit,
  chapter,
  onUpdateChapters,
  moveItem,
  index,
}) => {
  const { ref, preview, handlerId, opacity, cursor } =
    useDragDrop<HTMLDivElement>({
      index,
      itemType: ITEM_TYPE,
      onMove: moveItem,
    });

  const [isUpdateOrder, setIsUpdateOrder] = useState(false);
  const { mutate: updateOrder } = useUpdateLessonOrder({
    onSuccess: () => setIsUpdateOrder(false),
  });

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

  const moveLessonItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      onUpdateChapters((prev) => {
        const newValue = update(prev[index].lessons, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prev?.[index]?.lessons?.[dragIndex] as any],
          ],
        });
        prev[index].lessons = newValue;
        return [...prev];
      });
      setIsUpdateOrder(true);
    },
    [index, onUpdateChapters]
  );

  useDidUpdate(() => {
    if (chapter?.id && isUpdateOrder) {
      updateOrder({
        formValues: { ids: chapter.lessons.map((v) => v.id) },
        id: chapter?.id,
      });
    }
  }, [chapter.lessons, chapter?.id, updateOrder]);

  return (
    <div className="col-span-6">
      <Card
        isBlurred
        ref={preview}
        style={{ opacity }}
        data-handler-id={handlerId}
      >
        <CardHeader className="px-6 py-4">
          <div className="flex items-center gap-4 w-full">
            <div
              className="flex items-center justify-center"
              style={{ cursor }}
              ref={ref}
            >
              <RxDragHandleDots2 size={20} />
            </div>
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
              {chapter.lessons.map((lesson, lessonIndex) => {
                return (
                  <LessonItem
                    chapterId={chapter.id}
                    index={lessonIndex}
                    moveItem={moveLessonItem}
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
                  lessons: [
                    ...prev[indexChapter].lessons,
                    {
                      ...data,
                      order: (prev[indexChapter]?.lessons?.length ?? 0) + 1,
                    },
                  ],
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
    </div>
  );
};

export default ChapterItem;
