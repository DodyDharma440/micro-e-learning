import type { IconType } from "react-icons";

export interface ISidebarItem {
  icon: IconType;
  label: string;
  path: string;
  pathnames?: string[];
}

export type SortType = "asc" | "desc" | "default";

export interface TableActionArgs<T, I = number> {
  onEdit: (data: T) => void;
  onDelete: (id: I) => void;
}
