import React, { useCallback } from "react";
import {
  IoArrowUpOutline,
  IoFileTrayOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { TbArrowsSort } from "react-icons/tb";

import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { rankItem } from "@tanstack/match-sorter-utils";
import type {
  Cell,
  ColumnDef,
  FilterFn,
  Header,
  HeaderGroup,
  OnChangeFn,
  Row,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { AxiosError } from "axios";

import type { SortType } from "@/common/interfaces/layout";
import { getErrorMessage } from "@/common/utils/react-query";

import DataTableContainer from "../Container";
import DataTablePerPage from "../PerPage";
import DataTableSearch from "../Search";
import DataTableWrapper from "../Wrapper";

type ElProps<C extends keyof JSX.IntrinsicElements> = JSX.IntrinsicElements[C];

export type TableElementProps<D> = Partial<{
  th: ElProps<"th"> | ((header?: Header<D, any>) => ElProps<"th">);
  trHead: ElProps<"tr"> | ((headerGroup?: HeaderGroup<D>) => ElProps<"tr">);
  td: ElProps<"td"> | ((cell?: Cell<D, any>) => ElProps<"td">);
  trBody: ElProps<"tr"> | ((row?: Row<D>) => ElProps<"tr">);
}>;

type DataTableProps<D extends object = {}, V = any> = {
  data: D[];
  columns: ColumnDef<D, V>[];
  withFooter?: boolean;
  rowSelection?: RowSelectionState;
  isLoading?: boolean;
  isRefetching?: boolean;
  error?: AxiosError<any, any> | null;
  clientSearch?: string;
  onChangeClientSearch?: (val: string) => void;
  onChangeSelection?: OnChangeFn<RowSelectionState>;
  elementProps?: TableElementProps<D>;
  getRowCanExpand?: (row: Row<D>) => boolean;
  renderSubComponent?: (row: Row<D>) => React.ReactNode;
  expandContentOffset?: number;
  sortBy?: { field: string; type: SortType };
  onSort?: (args: { field: string; type: SortType }) => void;
};

const getElementProps = <T, P>(elProps: T | ((data?: P) => T), data?: P) => {
  if (elProps instanceof Function) {
    return elProps(data);
  }
  return elProps;
};

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);

  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

const DataTable = <D extends object, V = any>({
  data,
  columns,
  rowSelection,
  onChangeSelection,
  elementProps,
  isLoading,
  isRefetching,
  error,
  clientSearch,
  getRowCanExpand,
  renderSubComponent,
  expandContentOffset = 2,
  sortBy,
  onSort,
}: DataTableProps<D, V>) => {
  const table = useReactTable<D>({
    data,
    columns,
    getRowCanExpand: renderSubComponent ? () => true : getRowCanExpand,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      rowSelection,
      globalFilter: clientSearch,
    },
    onRowSelectionChange: onChangeSelection,
    globalFilterFn: fuzzyFilter,
  });

  const headerGroups = table.getHeaderGroups();
  const rowModels = table.getRowModel();

  const handleSort = useCallback(
    (key?: string) => {
      if (key) {
        const typesData: Record<SortType, SortType> = {
          asc: "desc",
          desc: "default",
          default: "asc",
        };
        onSort?.({ field: key, type: typesData[sortBy?.type || "default"] });
      }
    },
    [onSort, sortBy?.type]
  );

  return (
    <div className="overflow-auto relative">
      <Table>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              {...getElementProps(elementProps?.trHead, headerGroup)}
            >
              {headerGroup.headers.map((header) => {
                const { sortKey, justifyHeader } = header.column.columnDef;

                return (
                  <TableColumn
                    key={header.id}
                    title={sortKey ? `Sort by ${sortKey}` : undefined}
                    style={{
                      cursor: sortKey ? "pointer" : "default",
                    }}
                    {...(getElementProps(elementProps?.th, header) as any)}
                    onClick={() => handleSort(sortKey)}
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        className="flex items-center gap-4"
                        style={{ justifyContent: justifyHeader }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span className="flex opacity-80">
                          {sortBy && sortBy?.field === sortKey ? (
                            <>
                              {sortBy?.type === "default" ? (
                                <TbArrowsSort />
                              ) : (
                                <span
                                  className="flex transition-all duration-200"
                                  style={{
                                    transform: `rotate(${
                                      sortBy?.type === "desc" ? "180deg" : "0"
                                    })`,
                                  }}
                                >
                                  <IoArrowUpOutline />
                                </span>
                              )}
                            </>
                          ) : sortKey ? (
                            <TbArrowsSort />
                          ) : null}
                        </span>
                      </div>
                    )}
                  </TableColumn>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isRefetching && !isLoading ? (
            <>
              <TableRow className="absolute bg-gray-500 bg-opacity-50 inset-0 z-20">
                <></>
              </TableRow>
              <TableRow className="absolute inset-0 z-30">
                <TableCell
                  colSpan={columns.length}
                  className="w-full flex items-center justify-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            </>
          ) : (
            <></>
          )}
          {isLoading ? (
            <TableRow className="h-[300px]">
              <TableCell colSpan={columns.length}>
                <div className="flex items-center justify-center">
                  <Spinner />
                </div>
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow className="h-[300px]">
              <TableCell colSpan={columns.length}>
                <div className="flex items-center justify-center flex-col">
                  <IoWarningOutline size={36} />
                  <p className="mt-2">{getErrorMessage(error)}</p>
                </div>
              </TableCell>
            </TableRow>
          ) : [data.length, rowModels.rows.length].includes(0) ? (
            <TableRow className="h-[300px]">
              <TableCell colSpan={columns.length}>
                <div className="flex items-center justify-center flex-col">
                  <IoFileTrayOutline size={36} />
                  <p className="mt-2">No Data</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            <>
              {rowModels.rows.map((row) => {
                return (
                  <React.Fragment key={row.id}>
                    <TableRow {...getElementProps(elementProps?.trBody, row)}>
                      {row.getVisibleCells().map((cell) => {
                        const { justifyBody } = cell.column.columnDef;

                        return (
                          <TableCell
                            key={cell.id}
                            {...getElementProps(elementProps?.td, cell)}
                          >
                            <div
                              className="flex items-center"
                              style={{ justifyContent: justifyBody }}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                    {row.getIsExpanded() && renderSubComponent ? (
                      <TableRow>
                        {
                          [...Array(expandContentOffset)].map((_, i) => {
                            return (
                              <TableCell key={i}>
                                <></>
                              </TableCell>
                            );
                          }) as any
                        }
                        <TableCell
                          colSpan={
                            row.getVisibleCells().length - expandContentOffset
                          }
                        >
                          {renderSubComponent(row)}
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </React.Fragment>
                );
              })}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

const _DataTable: typeof DataTable & {
  Container: typeof DataTableContainer;
  Search: typeof DataTableSearch;
  PerPage: typeof DataTablePerPage;
  Wrapper: typeof DataTableWrapper;
} = DataTable as any;

_DataTable.Container = DataTableContainer;
_DataTable.Search = DataTableSearch;
_DataTable.PerPage = DataTablePerPage;
_DataTable.Wrapper = DataTableWrapper;

export default _DataTable;
