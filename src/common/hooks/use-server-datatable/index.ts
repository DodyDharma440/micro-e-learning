import type { UseDataTablePagination } from "../use-datatable-pagination";
import { useDataTablePagination } from "../use-datatable-pagination";
import type { UseDataTableSearch } from "../use-datatable-search";
import { useDataTableSearch } from "../use-datatable-search";
import type { UseDataTableSort } from "../use-datatable-sort";
import { useDataTableSort } from "../use-datatable-sort";

type UseServerDataTable = {
  pagination?: UseDataTablePagination;
  search?: UseDataTableSearch;
  sort?: UseDataTableSort;
};

export const useServerDataTable = (props?: UseServerDataTable) => {
  const { paginationParams, paginationLifecycle, ...tablePagination } =
    useDataTablePagination(props?.pagination);
  const { searchParams, searchLifecycle, ...tableSearch } = useDataTableSearch(
    props?.search
  );
  const { sortParams, sortLifecycle, ...tableSort } = useDataTableSort(
    props?.sort
  );

  const tableLifecycleProps = {
    ...paginationLifecycle,
    ...searchLifecycle,
    ...sortLifecycle,
  };

  const tableParams = `${paginationParams}&${searchParams}${sortParams}`;

  return {
    tableLifecycleProps,
    tableParams,
    searchParams,
    paginationParams,
    sortParams,
    searchLifecycle,
    paginationLifecycle,
    sortLifecycle,
    ...tablePagination,
    ...tableSearch,
    ...tableSort,
  };
};
