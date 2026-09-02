export interface CreateBookDto {
  title: string;
  categoryId?: number;
  authorId: number;
  description?: string;
  pages: number;
  isActive?: boolean;
  publishedYear: number;
}
