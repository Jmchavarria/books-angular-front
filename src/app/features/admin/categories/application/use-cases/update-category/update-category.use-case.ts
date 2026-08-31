import { Injectable } from '@angular/core';
import { CategoriesRepository } from '../../../domain/repositories/categories.repository';
import { UpdateCategoryDto } from './update-category.dto';
import { Categories } from '../../../domain/entities/categories.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateCategoryUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute(input: UpdateCategoryDto): Observable<Categories> {
    return this.repository.update(input);
  }
}
