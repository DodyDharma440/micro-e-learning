import React from "react";

import { Button } from "@nextui-org/react";

export type DataTablePaginationProps = {
  currentPage: number;
  perPage: number;
  total: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
};

const DataTablePagination: React.FC<DataTablePaginationProps> = ({
  currentPage,
  perPage,
  total,
  totalPages,
  onNext,
  onPrev,
  hasPrevPage,
  hasNextPage,
}) => {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm">
          Show {perPage > total ? total : perPage} from {total}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button disabled={!hasPrevPage} size="sm" onClick={onPrev}>
          Previous
        </Button>
        <p className="text-sm">
          Page {currentPage} of {totalPages || 1}
        </p>
        <Button disabled={!hasNextPage} size="sm" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default DataTablePagination;
