import React from "react";
import { HiCheck } from "react-icons/hi";
import { HiOutlineDocument, HiOutlineTv } from "react-icons/hi2";

import {
  Accordion,
  AccordionItem,
  Card,
  cn,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";

import { useCourseDetail } from "@/modules/course/contexts";

const ChapterList = () => {
  const { course, activeLesson, setActiveLesson } = useCourseDetail();

  return (
    <Card className="p-4" isBlurred shadow="md">
      <Accordion variant="bordered">
        {(course?.chapters ?? []).map((chapter) => {
          return (
            <AccordionItem
              key={chapter.id}
              aria-label={chapter.name}
              title={chapter.name}
              subtitle={`${chapter.lessons.length} lessons`}
              classNames={{ title: "text-base" }}
            >
              <Listbox aria-label="User Menu" className="mb-5 p-0 gap-0">
                {chapter.lessons.map((lesson) => {
                  const isActive = lesson.id === activeLesson;
                  const isCompleted = false;
                  const Icon =
                    lesson.lessonType === "VIDEO"
                      ? HiOutlineTv
                      : HiOutlineDocument;

                  return (
                    <ListboxItem
                      className={cn(
                        "border border-dashed border-gray-200 dark:border-gray-700 px-3 py-2 gap-3 mb-2 data-[hover=true]:bg-default-500/10",
                        {
                          ["border-primary-500 bg-primary-500/10 dark:border-primary-200 data-[hover=true]:bg-primary-500/10"]:
                            isActive,
                        }
                      )}
                      key={lesson.id}
                      onClick={() =>
                        setActiveLesson((prev) =>
                          prev === lesson.id ? null : lesson.id
                        )
                      }
                      startContent={<Icon className="text-xl" />}
                      endContent={
                        <div
                          className={cn(
                            "flex items-center justify-center gap-1 text-default-400 border border-dashed border-gray-400 dark:border-gray-700 rounded-full w-7 h-7",
                            {
                              ["border-primary-500 dark:border-primary-500"]:
                                isCompleted,
                            }
                          )}
                        >
                          {isCompleted ? (
                            <HiCheck className="text-primary-500" />
                          ) : null}
                        </div>
                      }
                    >
                      <p>{lesson.name}</p>
                      <p className="text-gray-400 capitalize text-sm">
                        {lesson.lessonType.toLowerCase()}
                      </p>
                    </ListboxItem>
                  );
                })}
              </Listbox>
            </AccordionItem>
          );
        })}
      </Accordion>
    </Card>
  );
};

export default ChapterList;
