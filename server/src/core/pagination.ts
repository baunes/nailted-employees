export class Pagination {
  private constructor(
    readonly page: number,
    readonly size: number,
    readonly totalPages: number,
    readonly totalItems: number,
  ) {}

  get hasPrevious(): boolean {
    return this.page > 0;
  }

  get hasNext(): boolean {
    return !!this.totalPages && this.page + 1 < this.totalPages;
  }

  public static none(): Pagination {
    return new Pagination(-1, -1, NaN, NaN);
  }

  public static basic(page: number, size: number): Pagination {
    return new Pagination(page, size, NaN, NaN);
  }

  public static full(page: number, size: number, totalPages: number, totalItems: number): Pagination {
    return new Pagination(page, size, totalPages, totalItems);
  }
}
