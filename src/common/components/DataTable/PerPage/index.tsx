import React, { useMemo } from "react";

import { Select, SelectItem } from "@nextui-org/react";

export type DataTablePerPageProps = {
  options?: number[];
  perPage: number;
  onChange: (value: number) => void;
};

const DataTablePerPage: React.FC<DataTablePerPageProps> = ({
  options,
  perPage,
  onChange,
}) => {
  const perPageOpts = useMemo(() => {
    return (options || [10, 20, 30, 40, 50]).map((el) => `${el}`);
  }, [options]);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">Show</p>
      <Select
        placeholder="Target User"
        className="w-[80px]"
        value={`${perPage}`}
        selectedKeys={[`${perPage}`]}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {perPageOpts.map((opt) => (
          <SelectItem key={opt}>{opt}</SelectItem>
        ))}
      </Select>
      <p className="text-sm">Data</p>
    </div>
  );
};

export default DataTablePerPage;
