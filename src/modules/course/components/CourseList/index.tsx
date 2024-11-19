import React, { useCallback, useMemo, useState } from "react";

import { useRouter } from "next/router";

import type { CourseStatus } from "@prisma/client";

import { AlertDialog, DataTable } from "@/common/components";
import { useUserContext } from "@/common/contexts";
import {
  useDataTableLifecycle,
  useDisclosureData,
  useServerDataTable,
} from "@/common/hooks";

import { useDeleteCourse, useGetCourses, useUpdateCourse } from "../../actions";
import { courseColumns, COURSES } from "../../constants";
import type { ICourse } from "../../interfaces";

const CourseList = () => {
  const { push } = useRouter();
  const { userData } = useUserContext();

  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetCourses({
    urlParams: `?${tableParams}`,
  });

  const courses = data?.data.data.nodes || [];

  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<string>();

  const { mutate: deleteCourse, isPending: isLoadingDelete } = useDeleteCourse({
    onSuccess: closeDelete,
  });
  const handleDelete = () => {
    if (deleteData) deleteCourse({ id: deleteData });
  };

  const [isOpenStatus, { open: openStatus, close: closeStatus }, statusData] =
    useDisclosureData<ICourse>();
  const { mutate: updateCourse, isPending: isLoadingStatus } = useUpdateCourse({
    overrideKeys: [COURSES],
  });

  const handleChangeStatus = () => {
    const handleUpdate = (nextStatus: CourseStatus) => {
      updateCourse(
        { formValues: { status: nextStatus }, id: statusData?.id ?? "" },
        {
          onSuccess: () => {
            closeStatus();
          },
        }
      );
    };

    switch (statusData?.status) {
      case "draft":
        handleUpdate("published");
        break;
      case "published":
        handleUpdate("archive");
        break;
      case "archive":
        handleUpdate("published");
        break;
    }
  };

  const [alertMessage, setAlertMessage] = useState("");
  const handleSetMessage = useCallback(
    (course: ICourse) => {
      openStatus(course);
      switch (course.status) {
        case "draft":
          setAlertMessage("Are you sure you want to publish this course?");
          break;
        case "published":
          setAlertMessage("Are you sure you want to archive this course?");
          break;
        case "archive":
          setAlertMessage("Are you sure you want to unarchive this course?");
          break;
      }
    },
    [openStatus]
  );

  const columns = useMemo(() => {
    return courseColumns({
      onDelete: openDelete,
      onEdit: (course) =>
        push(
          `/${userData?.role === "trainer" ? "trainer" : "admin"}/courses/${
            course.id
          }/edit`
        ),
      onStatus: handleSetMessage,
      isTrainer: userData?.role === "trainer",
    });
  }, [handleSetMessage, openDelete, push, userData?.role]);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <>
      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={courses}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
          elementProps={{
            td: (cell) => {
              return {
                className: cell?.id.includes("status") ? "capitalize" : "",
              };
            },
          }}
        />
      </DataTable.Container>

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

      <AlertDialog
        isOpen={isOpenStatus}
        onClose={isLoadingStatus ? () => {} : closeStatus}
        title="Change Status"
        message={alertMessage}
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        onCancel={isLoadingStatus ? () => {} : closeStatus}
        onConfirm={handleChangeStatus}
        color="primary"
        confirmButtonProps={{ isLoading: isLoadingStatus }}
      />
    </>
  );
};

export default CourseList;
