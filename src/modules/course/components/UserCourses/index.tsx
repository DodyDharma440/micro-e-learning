import React from "react";

import Link from "next/link";

import { EmptyPlaceholder, Loader } from "@/common/components";

import { useGetUserCourses } from "../../actions";
import CourseCard from "../CourseCard";

const UserCourses = () => {
  const { data, isLoading, isRefetching, error } = useGetUserCourses();
  const courses = data?.data.data || [];

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      {courses.length ? (
        <div className="grid grid-cols-12 gap-4">
          {courses.map((course) => {
            return (
              <div
                key={course.id}
                className="col-span-12 md:col-span-6 lg:col-span-4"
              >
                <Link href={`/user/courses/${course.slug}`}>
                  <CourseCard course={course} isReadOnly withProgress />
                </Link>
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
