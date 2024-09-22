export interface ApiResponse<T> {
  ok: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface PaginationResponse<T> {
  pageInfo: {
    hasNextPage: boolean;
    nextPage?: number;
  };
  nodes: T[];
  totalCount: number;
}

export type BasicData = {
  id: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt?: string | null;
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
};
