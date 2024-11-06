import React from "react";

import ChapterList from "./ChapterList";
import LessonView from "./LessonView";

const UserCourseDetail = () => {
  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8">
        <LessonView />
      </div>
      <div className="col-span-4">
        <ChapterList />
      </div>
    </div>
  );
};

export default UserCourseDetail;
