export class PaginatedResponse<T> {
  constructor(
    public readonly data: T,
    public readonly total: number,
    public readonly page: number,
    public readonly limit: number,
  ) {}

  get totalPages(): number {
    return Math.ceil(this.total / this.limit);
  }
}
