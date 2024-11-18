import type { CSSProperties } from "react";

import type {
  AccessorFn,
  CellContext,
  ColumnDefTemplate,
  ColumnMeta,
  ColumnPinningColumnDef,
  ColumnSizingColumnDef,
  FiltersColumnDef,
  GroupingColumnDef,
  HeaderContext,
  RowData,
  SortingColumnDef,
  VisibilityColumnDef,
} from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnDefExtensions<TData extends RowData, TValue = unknown>
    extends VisibilityColumnDef,
      ColumnPinningColumnDef,
      FiltersColumnDef<TData>,
      SortingColumnDef<TData>,
      GroupingColumnDef<TData, TValue>,
      ColumnSizingColumnDef {}

  export interface ColumnDefBase<TData extends RowData, TValue = unknown>
    extends ColumnDefExtensions<TData, TValue> {
    getUniqueValues?: AccessorFn<TData, unknown[]>;
    footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
    cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
    meta?: ColumnMeta<TData, TValue>;
    sortKey?: string;
    justifyHeader?: CSSProperties["justifyContent"];
    justifyBody?: CSSProperties["justifyContent"];
  }
}
