import React from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import { Content } from "@/common/components";

const UserManagementContainer = () => {
  return (
    <Content
      title="User Management"
      action={
        <Button startContent={<HiPlus />} color="primary">
          Add User
        </Button>
      }
    >
      UserManagementContainer
    </Content>
  );
};

export default UserManagementContainer;
