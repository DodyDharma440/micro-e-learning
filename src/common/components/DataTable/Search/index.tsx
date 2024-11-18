import React from "react";
import { IoSearchOutline } from "react-icons/io5";

import type { InputProps } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

type DataTableSearchProps = {} & InputProps;

const DataTableSearch = React.forwardRef<
  HTMLInputElement,
  DataTableSearchProps
>(({ ...props }, ref) => {
  return (
    <Input
      ref={ref}
      icon={<IoSearchOutline />}
      placeholder="Search..."
      className="w-full max-w-[250px]"
      id="datatable-search"
      {...props}
    />
  );
});

DataTableSearch.displayName = "DataTableSearch";

export default DataTableSearch;
