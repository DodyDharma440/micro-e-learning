import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import type { TableActionArgs } from "@/common/interfaces/layout";
import { createTableColumns } from "@/common/utils/react-table";
import type { IUser } from "@/modules/auth/interfaces";

export const USERS = "users";

export const userColumns = ({ onEdit, onDelete }: TableActionArgs<IUser>) =>
  createTableColumns<IUser>(({ accessor }) => [
    accessor("name", { header: "Name" }),
    accessor("username", { header: "Username" }),
    accessor("role", { header: "Role" }),
    accessor((row) => row.workPosition.name, {
      header: "Work Position",
      id: "workPos",
    }),
    {
      header: "Action",
      justifyHeader: "center",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2 justify-center w-full">
            <Button isIconOnly onClick={() => onEdit(row.original)}>
              <HiOutlinePencil />
            </Button>
            <Button
              color="danger"
              isIconOnly
              onClick={() => onDelete(row.original.id)}
            >
              <HiOutlineTrash />
            </Button>
          </div>
        );
      },
    },
  ]);
