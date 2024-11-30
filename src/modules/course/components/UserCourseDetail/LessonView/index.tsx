import React, { useMemo } from "react";
import { HiCheck, HiDocumentDownload } from "react-icons/hi";
import { HiDocument } from "react-icons/hi2";

import Image from "next/image";

import { Button, Card, useDisclosure } from "@nextui-org/react";

import { AlertDialog } from "@/common/components";
import { convertYoutubeUrl } from "@/common/utils/helper";
import { useUpdateCourseProgress } from "@/modules/course/actions";
import { useCourseDetail } from "@/modules/course/contexts";
import type { ICourseLesson } from "@/modules/course/interfaces";

const LessonView = () => {
  const { activeLesson, course, setCourse, isReadOnly } = useCourseDetail();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const lesson = useMemo(() => {
    let _lesson: ICourseLesson | null = null;
    course?.chapters.forEach((c) => {
      if (_lesson) {
        return;
      }
      c.lessons.forEach((l) => {
        if (l.id === activeLesson) {
          _lesson = l;
        }
      });
    });
    return _lesson as ICourseLesson | null;
  }, [activeLesson, course?.chapters]);

  const { mutate: markComplete, isPending: isLoadingUpdate } =
    useUpdateCourseProgress({
      onSuccess: () => {
        onClose();
        setCourse((prev) => {
          if (prev) {
            return {
              ...prev,
              chapters: prev.chapters.map((chap) => {
                return {
                  ...chap,
                  lessons: chap.lessons.map((lesson) => {
                    return {
                      ...lesson,
                      CourseProgress: [
                        {
                          isCompleted:
                            lesson.id === activeLesson
                              ? true
                              : lesson.CourseProgress?.[0]?.isCompleted ??
                                false,
                        },
                      ],
                    };
                  }),
                };
              }),
              _count: {
                CourseProgress: (prev._count?.CourseProgress ?? 0) + 1,
              },
            };
          }
        });
      },
    });

  const handleMarkComplete = () => {
    if (course && activeLesson) {
      markComplete({
        formValues: {
          courseId: course.id,
          courseLessonId: activeLesson,
          isCompleted: true,
        },
      });
    }
  };

  return (
    <Card isBlurred className="p-4 w-full">
      <div className="w-full h-[450px] bg-black dark:bg-white bg-opacity-25 dark:bg-opacity-10 rounded-md relative overflow-hidden">
        {lesson ? (
          <>
            {lesson.lessonType === "DOCUMENT" ? (
              <div className="w-full h-full bg-blue-100 dark:bg-primary-500/30 flex items-center justify-center flex-col gap-4 text-center p-5">
                <HiDocument size={46} />
                <p className="max-w-[400px]">{lesson.content?.name}</p>
                <a
                  href={lesson.content?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button color="primary" startContent={<HiDocumentDownload />}>
                    Download
                  </Button>
                </a>
              </div>
            ) : null}

            {lesson.lessonType === "VIDEO" ? (
              <iframe
                className="w-full h-full object-center"
                src={convertYoutubeUrl(lesson.content?.url)}
                allowFullScreen
              />
            ) : null}
          </>
        ) : course?.thumbnail?.url ? (
          <Image
            src={course?.thumbnail.url}
            alt="thumb"
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      {activeLesson &&
      !lesson?.CourseProgress?.[0]?.isCompleted &&
      !isReadOnly ? (
        <>
          <Button
            onClick={onOpen}
            className="mt-4 ml-auto"
            color="success"
            startContent={<HiCheck />}
          >
            Mark as complete
          </Button>

          <AlertDialog
            isOpen={isOpen}
            onClose={isLoadingUpdate ? () => {} : onClose}
            title="Complete Lesson"
            message={`Are you sure you want to complete ${
              lesson?.name ?? "this lesson"
            }?`}
            cancelButtonText="Cancel"
            confirmButtonText="Confirm"
            onCancel={isLoadingUpdate ? () => {} : onClose}
            onConfirm={handleMarkComplete}
            color="primary"
            confirmButtonProps={{ isLoading: isLoadingUpdate }}
          />
        </>
      ) : null}
    </Card>
  );
};

export default LessonView;
