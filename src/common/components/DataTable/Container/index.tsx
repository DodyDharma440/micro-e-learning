import React from "react";

import { Divider } from "@nextui-org/react";

import type { DataTablePaginationProps } from "../Pagination";
import DataTablePagination from "../Pagination";

type DataTableContainerProps = {
  children: React.ReactNode;
  paginationProps?: DataTablePaginationProps;
} & JSX.IntrinsicElements["div"];

const DataTableContainer: React.FC<DataTableContainerProps> = ({
  children,
  paginationProps,

  ...props
}) => {
  return (
    <div {...props}>
      {children}
      {paginationProps ? (
        <>
          <Divider />
          <div className="p-4">
            <DataTablePagination {...paginationProps} />
          </div>
        </>
      ) : null}
    </div>
  );
};

export default DataTableContainer;
