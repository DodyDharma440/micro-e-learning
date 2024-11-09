import React, { useMemo } from "react";
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";

import { useRouter } from "next/router";

import { Button, Card, Progress } from "@nextui-org/react";

import { useCourseDetail } from "../../contexts";
import ChapterList from "./ChapterList";
import LessonView from "./LessonView";

const UserCourseDetail = () => {
  const { push } = useRouter();

  const { course } = useCourseDetail();
  const totalProgress = useMemo(() => {
    const totalLesson = (course?.chapters ?? []).reduce((prev, curr) => {
      prev += curr.lessons.length;
      return prev;
    }, 0);

    const result = (100 * (course?._count.CourseProgress ?? 0)) / totalLesson;
    return result.toFixed(0);
  }, [course?._count.CourseProgress, course?.chapters]);

  return (
    <div>
      <div className="flex mb-6 gap-5">
        <div className="flex-1">
          <Card isBlurred className="p-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-medium">Your Progress</p>
                <p className="font-bold">{totalProgress}%</p>
              </div>
              <Progress
                aria-label="course progress"
                size="md"
                value={Number(totalProgress)}
                color="success"
              />
            </div>
          </Card>
        </div>
        {course?.enableForum ? (
          <Button
            onClick={() => push(`/user/courses/${course.slug}/forums`)}
            color="secondary"
            startContent={<HiOutlineChatBubbleLeftEllipsis />}
          >
            Open Discussion
          </Button>
        ) : null}
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <LessonView />
        </div>
        <div className="col-span-4">
          <ChapterList />
        </div>
      </div>
    </div>
  );
};

export default UserCourseDetail;
