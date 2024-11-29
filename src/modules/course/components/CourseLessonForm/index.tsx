import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { HiPlus } from "react-icons/hi";

import { Button } from "@nextui-org/react";
import update from "immutability-helper";

import { AlertDialog, Content, EmptyPlaceholder } from "@/common/components";
import { useUserContext } from "@/common/contexts";
import { useDisclosureData } from "@/common/hooks";

import { useDeleteChapter } from "../../actions";
import { defaultChapter } from "../../constants";
import type { ICourse, ICourseChapter } from "../../interfaces";
import ChapterForm from "./ChapterForm";
import ChapterItem from "./ChapterItem";

type CourseLessonFormProps = {
  course?: ICourse;
};

const CourseLessonForm: React.FC<CourseLessonFormProps> = ({ course }) => {
  const { userData } = useUserContext();
  const [chapters, setChapters] = useState<ICourseChapter[]>([]);

  const [isOpen, { open, close }, chapterData] =
    useDisclosureData<ICourseChapter | null>({ closeDelay: 1 });
  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<ICourseChapter | null>();

  const { mutate: deleteChapter, isPending: isLoadingDelete } =
    useDeleteChapter({
      onSuccess: () => {
        setChapters((prev) => prev.filter((p) => p.id !== deleteData?.id));
        closeDelete();
      },
    });
  const handleDelete = () => {
    deleteChapter({ id: deleteData?.id ?? "" });
  };

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setChapters((prev) => {
      const newValue = update(prev, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prev?.[dragIndex] as any],
        ],
      });
      return newValue;
    });
  }, []);

  useEffect(() => {
    if (course) {
      setChapters(course.chapters);
    }
  }, [course]);

  return (
    <Content
      title={`Course Lessons - ${course?.name}`}
      withBackButton
      backHref={`/${
        userData?.role === "trainer" ? "trainer" : "admin"
      }/courses`}
      action={
        <Button
          startContent={<HiPlus />}
          color="primary"
          onClick={() => open(null)}
        >
          Add New Chapter
        </Button>
      }
    >
      <DndProvider backend={HTML5Backend}>
        {chapters?.length ? (
          <div className="grid grid-cols-12 gap-4">
            {chapters.map((chapter, index) => {
              return (
                <ChapterItem
                  index={index}
                  chapter={chapter}
                  onEdit={open}
                  onDelete={openDelete}
                  onUpdateChapters={setChapters}
                  moveItem={moveItem}
                  key={chapter.id}
                />
              );
            })}
          </div>
        ) : (
          <EmptyPlaceholder message="This course doesn't have any chapters. Please add more chapter to this course." />
        )}
      </DndProvider>

      <ChapterForm
        isOpen={isOpen}
        onClose={close}
        chapter={chapterData}
        onSuccess={(data, action) => {
          switch (action) {
            case "update":
              setChapters((prev) => {
                if (chapterData) {
                  const index = prev?.findIndex(
                    (c) => c.id === chapterData?.id
                  );
                  prev[index] = { ...chapterData, ...data };
                }
                return [...prev];
              });
              break;
            case "create":
              setChapters((prev) => [...prev, { ...defaultChapter, ...data }]);
              break;
          }
        }}
      />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={isLoadingDelete ? () => {} : closeDelete}
        title="Delete Chapter"
        message="Are you sure want to delete this chapter? All lessons in this will be deleted automatically."
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        color="danger"
        onCancel={isLoadingDelete ? () => {} : closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ isLoading: isLoadingDelete }}
      />
    </Content>
  );
};

export default CourseLessonForm;
