import React from "react";

import { AlertDialog, EmptyPlaceholder, Loader } from "@/common/components";
import { useDisclosureData } from "@/common/hooks";

import { useDeleteCourse, useGetCourses } from "../../actions";
import CourseCard from "../CourseCard";

const CourseList = () => {
  const { data, isLoading, isRefetching, error } = useGetCourses();

  const courses = data?.data.data || [];

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<string>();

  const { mutate: deleteCourse, isPending: isLoadingDelete } = useDeleteCourse({
    onSuccess: closeDelete,
  });
  const handleDelete = () => {
    if (deleteData) deleteCourse({ id: deleteData });
  };

  return (
    <Loader isLoading={isLoading} isRefetching={isRefetching} error={error}>
      {courses.length ? (
        <div className="grid grid-cols-12 gap-4">
          {courses.map((course) => {
            return (
              <div key={course.id} className="col-span-4">
                <CourseCard course={course} onDelete={openDelete} />
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyPlaceholder message="No courses yet" />
      )}

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={closeDelete}
        title="Delete Course"
        message="Are you sure want to delete this course?"
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        color="danger"
        onCancel={closeDelete}
        onConfirm={handleDelete}
        confirmButtonProps={{ isLoading: isLoadingDelete }}
      />
    </Loader>
  );
};

export default CourseList;
