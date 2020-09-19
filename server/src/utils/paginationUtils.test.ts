import { Pagination } from '../core/pagination';
import { PaginationUtils } from './paginationUtils';

describe('Paginations', () => {
  test('gets correctly the lower and upper limits when no pagination', () => {
    const p0 = Pagination.basic(-1, 1);
    expect(PaginationUtils.getLowerLimit(p0)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p0)).toBe(-1);

    const p1 = Pagination.basic(1, -1);
    expect(PaginationUtils.getLowerLimit(p1)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p1)).toBe(-1);

    const p2 = Pagination.basic(-1, -1);
    expect(PaginationUtils.getLowerLimit(p2)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p2)).toBe(-1);
  });

  test('gets correctly the lower and upper limits for page 0', () => {
    const p0 = Pagination.basic(0, 0);
    expect(PaginationUtils.getLowerLimit(p0)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p0)).toBe(-1);

    const p1 = Pagination.basic(0, 1);
    expect(PaginationUtils.getLowerLimit(p1)).toBe(0);
    expect(PaginationUtils.getUpperLimit(p1)).toBe(0);

    const p2 = Pagination.basic(0, 2);
    expect(PaginationUtils.getLowerLimit(p2)).toBe(0);
    expect(PaginationUtils.getUpperLimit(p2)).toBe(1);

    const p3 = Pagination.basic(0, 100);
    expect(PaginationUtils.getLowerLimit(p3)).toBe(0);
    expect(PaginationUtils.getUpperLimit(p3)).toBe(99);
  });

  test('gets correctly the lower and upper limits for page 1', () => {
    const p0 = Pagination.basic(1, 0);
    expect(PaginationUtils.getLowerLimit(p0)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p0)).toBe(-1);

    const p1 = Pagination.basic(1, 1);
    expect(PaginationUtils.getLowerLimit(p1)).toBe(1);
    expect(PaginationUtils.getUpperLimit(p1)).toBe(1);

    const p2 = Pagination.basic(1, 2);
    expect(PaginationUtils.getLowerLimit(p2)).toBe(2);
    expect(PaginationUtils.getUpperLimit(p2)).toBe(3);

    const p3 = Pagination.basic(1, 100);
    expect(PaginationUtils.getLowerLimit(p3)).toBe(100);
    expect(PaginationUtils.getUpperLimit(p3)).toBe(199);
  });

  test('gets correctly the lower and upper limits for page 5', () => {
    const p0 = Pagination.basic(5, 0);
    expect(PaginationUtils.getLowerLimit(p0)).toBe(-1);
    expect(PaginationUtils.getUpperLimit(p0)).toBe(-1);

    const p1 = Pagination.basic(5, 1);
    expect(PaginationUtils.getLowerLimit(p1)).toBe(5);
    expect(PaginationUtils.getUpperLimit(p1)).toBe(5);

    const p2 = Pagination.basic(5, 2);
    expect(PaginationUtils.getLowerLimit(p2)).toBe(10);
    expect(PaginationUtils.getUpperLimit(p2)).toBe(11);

    const p3 = Pagination.basic(5, 100);
    expect(PaginationUtils.getLowerLimit(p3)).toBe(500);
    expect(PaginationUtils.getUpperLimit(p3)).toBe(599);
  });

  test('initializes correctly totalPages', () => {
    const p0 = PaginationUtils.createPaginationWithTotals(Pagination.basic(0, 0), 0);
    expect(p0.totalPages).toBe(0);
    expect(p0.totalItems).toBe(0);

    const p1 = PaginationUtils.createPaginationWithTotals(Pagination.basic(0, 5), 3);
    expect(p1.totalPages).toBe(1);
    expect(p1.totalItems).toBe(3);

    const p2 = PaginationUtils.createPaginationWithTotals(Pagination.basic(1, 4), 7);
    expect(p2.totalPages).toBe(2);
    expect(p2.totalItems).toBe(7);

    const p3 = PaginationUtils.createPaginationWithTotals(Pagination.basic(1, 4), 8);
    expect(p3.totalPages).toBe(2);
    expect(p3.totalItems).toBe(8);
  });
});
