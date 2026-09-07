export class PaginatedResponse<T> {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: T,
    public readonly total: number,
    public readonly page: number,
    public readonly limit: number,
    public readonly totalPages: number,
  ) {}
}
