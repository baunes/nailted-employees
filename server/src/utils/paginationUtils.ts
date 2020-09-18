import { Pagination } from '../core/pagination';

export class PaginationUtils {
  /**
   * Returns the lower limit. Zero based
   */
  public static getLowerLimit(pagination: Pagination): number {
    return pagination.size > 0 ? pagination.page * pagination.size : -1;
  }

  /**
   * Returns the upper limit. Zero based
   */
  public static getUpperLimit(pagination: Pagination): number {
    return pagination.size > 0 ? pagination.page * pagination.size + pagination.size - 1 : -1;
  }

  public static getTotalPages(pagination: Pagination, totalItems: number): Pagination {
    return Pagination.full(pagination.page, pagination.size, Math.ceil(totalItems / pagination.size) || 0, totalItems);
  }
}
