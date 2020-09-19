import { Pagination } from '../core/pagination';

export class PaginationUtils {
  /**
   * Returns the lower limit. Zero based
   */
  public static getLowerLimit(pagination: Pagination): number {
    return pagination.page >= 0 && pagination.size > 0 ? pagination.page * pagination.size : -1;
  }

  /**
   * Returns the upper limit. Zero based
   */
  public static getUpperLimit(pagination: Pagination): number {
    return pagination.page >= 0 && pagination.size > 0 ? pagination.page * pagination.size + pagination.size - 1 : -1;
  }

  public static createPaginationWithTotals(pagination: Pagination, totalItems: number): Pagination {
    const page = pagination.page >= 0 && pagination.size > 0 ? pagination.page : 0;
    const size = pagination.page >= 0 && pagination.size > 0 ? pagination.size : totalItems;
    return Pagination.full(page, size, Math.ceil(totalItems / size) || 0, totalItems);
  }
}
