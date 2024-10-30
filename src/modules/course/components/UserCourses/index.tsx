import React from "react";

import { EmptyPlaceholder, Loader } from "@/common/components";

import { useGetCourses } from "../../actions";
import CourseCard from "../CourseCard";

const UserCourses = () => {
  const { data, isLoading, isRefetching, error } = useGetCourses();
  const courses = data?.data.data || [];

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      {courses.length ? (
        <div className="grid grid-cols-12 gap-4">
          {courses.map((course) => {
            return (
              <div key={course.id} className="col-span-4">
                <CourseCard course={course} isReadOnly />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyPlaceholder message="No courses yet" />
      )}
    </Loader>
  );
};

export default UserCourses;
