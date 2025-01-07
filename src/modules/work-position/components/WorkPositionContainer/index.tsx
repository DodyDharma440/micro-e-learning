import React, { useMemo } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import { AlertDialog, Content, DataTable } from "@/common/components";
import { useDisclosureData, useServerDataTable } from "@/common/hooks";
import { useDataTableLifecycle } from "@/common/hooks/use-datatable-lifecycle";

import { useDeleteWorkPos, useGetWorkPositions } from "../../actions";
import { workPosColumns } from "../../constants";
import type { IWorkPosition } from "../../interfaces";
import WorkPositionForm from "../WorkPositionForm";

const WorkPositionContainer = () => {
  const [isOpen, { open, close }, editData] =
    useDisclosureData<IWorkPosition | null>();
  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<string>();

  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetWorkPositions(
    { urlParams: `?${tableParams}` }
  );

  const workPoss = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const columns = useMemo(() => {
    return workPosColumns({
      onDelete: openDelete,
      onEdit: open,
    });
  }, [open, openDelete]);

  const { mutate: deleteWorkPos, isPending: isLoadingDelete } =
    useDeleteWorkPos({
      onSuccess: closeDelete,
    });

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Content
      title="Work Position"
      action={
        <Button
          startContent={<HiPlus />}
          onClick={() => open(null)}
          color="primary"
        >
          Add Work Position
        </Button>
      }
    >
      <DataTable.Wrapper content="search-perpage">
        <DataTable.PerPage {...perPageProps} />
        <DataTable.Search {...searchProps} />
      </DataTable.Wrapper>

      <DataTable.Container paginationProps={paginationProps}>
        <DataTable
          data={workPoss}
          columns={columns}
          isLoading={isLoading}
          isRefetching={isRefetching}
          error={error}
        />
      </DataTable.Container>

      <WorkPositionForm isOpen={isOpen} onClose={close} editValue={editData} />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={isLoading ? () => {} : closeDelete}
        title="Delete Work Position"
        message="Are you sure want to delete this work position?"
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        onCancel={isLoadingDelete ? () => {} : closeDelete}
        onConfirm={() => deleteWorkPos({ id: deleteData ?? "" })}
        color="primary"
        confirmButtonProps={{ isLoading: isLoadingDelete }}
      />
    </Content>
  );
};

export default WorkPositionContainer;
