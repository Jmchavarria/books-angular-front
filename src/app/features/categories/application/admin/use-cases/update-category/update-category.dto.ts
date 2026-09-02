import { CreateCategoryDto } from '../create-category/create-category.dto';

export type UpdateCategoryDto = Partial<CreateCategoryDto> & { id: number };
