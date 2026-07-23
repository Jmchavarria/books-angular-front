export class Book {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly author: { name: string },
    public readonly description: string,
    public readonly pages: number,
    public readonly publishedYear: number,
    public readonly category: { id: number; name: string },
  ) {}
}
