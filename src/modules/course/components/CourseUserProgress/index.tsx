import React, { useMemo } from "react";

import { Content, DataTable } from "@/common/components";
import { useUserContext } from "@/common/contexts";
import { useDataTableLifecycle, useServerDataTable } from "@/common/hooks";

import { useGetUsersProgress } from "../../actions";
import { userProgressColumns } from "../../constants";
import { useCourseDetail } from "../../contexts";

const CourseUserProgress = () => {
  const { userData } = useUserContext();
  const { course } = useCourseDetail();

  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetUsersProgress(
    {
      id: course?.id ?? "",
      urlParams: `?${tableParams}`,
    }
  );

  const users = data?.data.data.nodes || [];

  const columns = useMemo(() => {
    return userProgressColumns({
      course,
      isTrainer: userData?.role === "trainer",
    });
  }, [course, userData?.role]);

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Content title={`User Progress - ${course?.name}`} withBackButton>
      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={users}
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
    </Content>
  );
};

export default CourseUserProgress;
