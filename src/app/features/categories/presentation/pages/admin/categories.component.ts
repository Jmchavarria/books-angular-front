import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { PaginatedResponse } from '../../../../../core/types/paginated-response';
import {
  TableAction,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { Categories } from '../../../domain/entities/categories.entity';
import { GetAllCategoriesUseCase } from '../../../application/admin/use-cases/get-all-categories/get-all-categories-use-case';
import { CreateCategoryUseCase } from '../../../application/admin/use-cases/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from '../../../application/admin/use-cases/update-category/update-category.use-case';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, TableComponent, ReactiveFormsModule, NgIcon],
  providers: [
    provideIcons({
      heroXMark,
    }),
  ],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  categoriesform: FormGroup;
  isSubmitted = signal<boolean>(false);
  isLoading = signal(false);
  categories = signal<Categories[]>([]);
  isModalOpen = signal<boolean>(false);
  selectedCategory: Categories | null = null;

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly fb: FormBuilder,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
  ) {
    // Validadores corregidos y limpios
    this.categoriesform = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(155)]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  actions: TableAction[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: 'pencil-square',
    },
  ];

  onAction(event: { action: TableAction; item: Categories }) {
    switch (event.action.key) {
      case 'edit':
        this.editCategory(event.item);
        break;
    }
  }

  loadCategories(): void {
    this.getAllCategoriesUseCase.execute().subscribe({
      next: (response: PaginatedResponse<Categories[]>) => {
        this.categories.set(response.data);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openModal() {
    this.selectedCategory = null;
    this.isSubmitted.set(false);

    this.categoriesform.reset({
      name: '',
      description: '',
    });

    this.isModalOpen.set(true);
  }

  editCategory(category: Categories) {
    this.selectedCategory = category;

    // Setea los datos en el Formulario Reactivo
    this.categoriesform.patchValue({
      name: category.name,
      deiption: category.description,
    });

    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
  }

  saveCategory() {
    this.isSubmitted.set(true);

    if (this.categoriesform.invalid) {
      this.categoriesform.markAllAsTouched();
      return;
    }

    const { name, description } = this.categoriesform.value;

    this.isLoading.set(true);

    if (this.selectedCategory === null) {
      this.createCategoryUseCase
        .execute({
          name,
          description,
        })
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            this.loadCategories();
            this.closeModal();
          },
          error: (err) => {
            this.isLoading.set(false);
            console.error(err);
          },
        });
    } else {
      this.updateCategoryUseCase
        .execute({
          id: this.selectedCategory.id,
          name,
          description,
        })
        .subscribe({
          next: (response) => {
            this.isLoading.set(false);
            this.loadCategories();
            this.closeModal();
          },
          error: (err) => {
            this.isLoading.set(false);
            console.error(err);
          },
        });
    }
  }
}
