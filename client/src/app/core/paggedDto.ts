import { Pagination } from './pagination';

export interface PaggedDto<T> {
  pagination: Pagination;
  items: T[];
}
