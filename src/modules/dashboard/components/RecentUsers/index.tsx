import React from "react";

import { Button, Card, Link } from "@nextui-org/react";
import dayjs from "dayjs";

import { EmptyPlaceholder, Loader } from "@/common/components";

import { useGetRecentUsers } from "../../actions";

const RecentUsers = () => {
  const { data, isLoading, error } = useGetRecentUsers();
  const users = data?.data.data || [];

  return (
    <Card isBlurred className="p-4 w-full">
      <Loader isLoading={isLoading} error={error}>
        <h4 className="font-bold text-lg">Recent Users</h4>
        <hr className="my-2 dark:border-neutral-700" />
        {users.length ? (
          <>
            {users.map((user) => {
              return (
                <div
                  className="flex items-end gap-4 py-3 border-b border-b-gray-200 dark:border-b-neutral-800"
                  key={user.id}
                >
                  <div className="flex-1">
                    <p className="font-semibold line-clamp-1">{user.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-400 line-clamp-1">
                      {user.role}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400">
                    {dayjs(user.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
              );
            })}
            {users.length > 10 ? (
              <Button
                as={Link}
                href="/admin/user-management"
                variant="light"
                className="mt-4"
                color="primary"
              >
                See all
              </Button>
            ) : null}
          </>
        ) : (
          <EmptyPlaceholder message="No users yet" />
        )}
      </Loader>
    </Card>
  );
};

export default RecentUsers;
