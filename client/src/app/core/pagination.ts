export interface Pagination {
  hasPrevious: boolean;
  hasNext: boolean;
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
}
