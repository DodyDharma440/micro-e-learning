import { HiOutlineChevronRight } from "react-icons/hi";

import { cn } from "@nextui-org/react";
import type { ColumnDef, ColumnHelper } from "@tanstack/react-table";
import { createColumnHelper } from "@tanstack/react-table";

type TableColumnsOptions = {
  withNumber?: boolean;
  withExpander?: boolean;
};

export const createTableColumns = <T, V = any>(
  callback: (helper: ColumnHelper<T>) => ColumnDef<T, V>[],
  options?: TableColumnsOptions
) => {
  const withNumber =
    typeof options?.withNumber !== "undefined" ? options.withNumber : true;

  const columnHelper = createColumnHelper<T>();
  const columns = callback(columnHelper);

  if (withNumber) {
    const columnNumber: ColumnDef<T, V> = {
      id: "row-number",
      header: "No.",
      cell: ({ row }) => {
        return row.index + 1;
      },
    };
    columns.splice(0, 0, columnNumber);
  }

  if (options?.withExpander) {
    const columnExpander: ColumnDef<T, V> = {
      id: "row-expand",
      header: "",
      cell: ({ row }) => {
        const isExpanded = row.getIsExpanded();

        return (
          <button
            color={isExpanded ? "primary" : "gray"}
            onClick={row.getToggleExpandedHandler()}
          >
            <div
              className={cn(
                "flex justify-center items-center transition-transform duration-200",
                {
                  ["rotate-90"]: isExpanded,
                }
              )}
            >
              <HiOutlineChevronRight />
            </div>
          </button>
        );
      },
    };
    columns.splice(0, 0, columnExpander);
  }

  return columns;
};
