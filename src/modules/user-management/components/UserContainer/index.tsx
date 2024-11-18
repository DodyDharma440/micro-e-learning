import React, { useMemo } from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import { AlertDialog, Content, DataTable } from "@/common/components";
import { useDisclosureData, useServerDataTable } from "@/common/hooks";
import { useDataTableLifecycle } from "@/common/hooks/use-datatable-lifecycle";
import type { IUser } from "@/modules/auth/interfaces";

import { useDeleteUser, useGetUsers } from "../../actions";
import { userColumns } from "../../constants";
import UserForm from "../UserForm";

const UserManagementContainer = () => {
  const [isOpen, { open, close }, editData] = useDisclosureData<IUser | null>();
  const [isOpenDelete, { open: openDelete, close: closeDelete }, deleteData] =
    useDisclosureData<string>();

  const {
    paginationProps,
    perPageProps,
    searchProps,
    tableLifecycleProps,
    tableParams,
  } = useServerDataTable();
  const { data, isLoading, isRefetching, error, refetch } = useGetUsers({
    urlParams: `?${tableParams}`,
  });

  const users = useMemo(() => {
    return data?.data.data.nodes || [];
  }, [data?.data.data]);

  const columns = useMemo(() => {
    return userColumns({
      onDelete: openDelete,
      onEdit: open,
    });
  }, [open, openDelete]);

  const { mutate: deleteUser, isPending: isLoadingDelete } = useDeleteUser({
    onSuccess: closeDelete,
  });

  useDataTableLifecycle({
    refetcher: refetch,
    total: data?.data.data.totalCount,
    ...tableLifecycleProps,
  });

  return (
    <Content
      title="User Management"
      action={
        <Button
          startContent={<HiPlus />}
          onClick={() => open(null)}
          color="primary"
        >
          Add User
        </Button>
      }
    >
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
        />
      </DataTable.Container>

      <UserForm isOpen={isOpen} onClose={close} editValue={editData} />

      <AlertDialog
        isOpen={isOpenDelete}
        onClose={isLoading ? () => {} : closeDelete}
        title="Delete User"
        message="Are you sure want to delete this user? All content by this user in course forum will be deleted."
        cancelButtonText="Cancel"
        confirmButtonText="Confirm"
        onCancel={isLoadingDelete ? () => {} : closeDelete}
        onConfirm={() => deleteUser({ id: deleteData ?? "" })}
        color="primary"
        confirmButtonProps={{ isLoading: isLoadingDelete }}
      />
    </Content>
  );
};

export default UserManagementContainer;
