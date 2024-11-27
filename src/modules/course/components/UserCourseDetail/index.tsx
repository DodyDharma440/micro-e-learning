import React, { useMemo } from "react";

import { Card, Progress } from "@nextui-org/react";

import { useCourseDetail } from "../../contexts";
import { calcProgress } from "../../utils";
import ChapterList from "./ChapterList";
import LessonView from "./LessonView";

const UserCourseDetail = () => {
  const { course } = useCourseDetail();
  const totalProgress = useMemo(() => {
    return calcProgress(course);
  }, [course]);

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
