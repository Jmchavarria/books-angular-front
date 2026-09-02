export interface CreateCategoryProps {
  name: string;
  description: string;
}

export type UpdateCategoryProps = Partial<CreateCategoryProps> & { id: number };
