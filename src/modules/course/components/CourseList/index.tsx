import React from "react";

import { Loader } from "@/common/components";

import { useGetCourses } from "../../actions";
import CourseCard from "../CourseCard";

const CourseList = () => {
  const { data, isLoading, isRefetching, error } = useGetCourses();

  const courses = data?.data.data || [];

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      <div className="grid grid-cols-12 gap-4">
        {courses.map((course) => {
          return (
            <div key={course.id} className="col-span-4">
              <CourseCard course={course} />
            </div>
          );
        })}
      </div>
    </Loader>
  );
};

export default CourseList;
