import React from "react";

import CourseDistrib from "../CourseDistrib";
import LatestCourses from "../LatestCourses";
import RecentUsers from "../RecentUsers";
import Stats from "../Stats";

const DashboardContainer = () => {
  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <Stats />
      </div>
      <div className="col-span-12">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-5">
            <LatestCourses />
          </div>
          <div className="col-span-4">
            <RecentUsers />
          </div>
          <div className="col-span-3">
            <CourseDistrib />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardContainer;
