import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi";

import { Button } from "@nextui-org/react";

import type { TableActionArgs } from "@/common/interfaces/layout";
import { createTableColumns } from "@/common/utils/react-table";

import type { IWorkPosition } from "../interfaces";

export const WORK_POSITIONS = "work-positions";

export const workPosColumns = ({
  onEdit,
  onDelete,
}: TableActionArgs<IWorkPosition>) =>
  createTableColumns<IWorkPosition>(({ accessor }) => [
    accessor("name", { header: "Name" }),
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
