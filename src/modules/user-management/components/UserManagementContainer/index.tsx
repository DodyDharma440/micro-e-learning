import React from "react";
import { HiPlus } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import { Content } from "@/common/components";
import { useDisclosureData } from "@/common/hooks";
import type { IUser } from "@/modules/auth/interfaces";

import UserForm from "../UserForm";

const UserManagementContainer = () => {
  const [isOpen, { open, close }, editData] = useDisclosureData<IUser | null>();

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
      <UserForm isOpen={isOpen} onClose={close} editValue={editData} />
    </Content>
  );
};

export default UserManagementContainer;
