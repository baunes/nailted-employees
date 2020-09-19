import { Pagination } from './pagination';

export class PaggedDto<T> {
  constructor(readonly pagination: Pagination, readonly items: T[]) {}
}
