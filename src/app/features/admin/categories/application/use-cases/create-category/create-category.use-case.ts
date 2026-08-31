import { Injectable } from '@angular/core';
import { CategoriesRepository } from '../../../domain/repositories/categories.repository';
import { CreateCategoryDto } from './create-category.dto';
import { Categories } from '../../../domain/entities/categories.entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoriesRepository) {}

  execute(input: CreateCategoryDto): Observable<Categories> {
    return this.repository.create(input);
  }
}
