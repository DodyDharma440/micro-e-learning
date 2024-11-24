import React from "react";

import { Card } from "@nextui-org/react";

import { EmptyPlaceholder, Loader } from "@/common/components";

import { useGetCourseDistrib } from "../../actions";

const CourseDistrib = () => {
  const { data, isLoading, error } = useGetCourseDistrib();
  const courses = data?.data.data || [];

  return (
    <Card isBlurred className="p-4 w-full">
      <Loader isLoading={isLoading} error={error}>
        <h4 className="font-bold text-lg">Course Distribution</h4>
        <hr className="mt-2 mb-4 dark:border-neutral-700" />
        {courses.length ? <></> : <EmptyPlaceholder message="No data" />}
      </Loader>
    </Card>
  );
};

export default CourseDistrib;
