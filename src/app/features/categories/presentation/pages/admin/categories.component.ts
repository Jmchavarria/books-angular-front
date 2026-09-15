import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  objectData,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { Categories } from '../../../domain/entities/categories.entity';
import { GetAllCategoriesUseCase } from '../../../application/admin/use-cases/get-all-categories/get-all-categories-use-case';
import { CreateCategoryUseCase } from '../../../application/admin/use-cases/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from '../../../application/admin/use-cases/update-category/update-category.use-case';
import { FormContainerComponent } from '../../../../../core/components/form-container/form-container.component';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { FiltersDto } from '../../../../../core/interfaces/filters.interface';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { TableAction } from '../../../../../core/types/table.type';
import { PaginatedResult } from '../../../../../core/types/paginated-response';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    FormsModule,
    TableComponent,
    ReactiveFormsModule,
    FormContainerComponent,
    ModalComponent,
    ButtonComponent,
    SearchBarComponent,
  ],

  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  [x: string]: any;
  categoriesform: FormGroup;
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  categories = signal<objectData<Categories>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });

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
      icon: 'heroPencilSquare',
    },
  ];

  onAction(event: { action: TableAction; item: Categories }) {
    switch (event.action.key) {
      case 'edit':
        this.editCategory(event.item);
        break;
    }
  }

  loadCategories(filters?: FiltersDto[]): void {
    this.getAllCategoriesUseCase.execute(filters).subscribe({
      next: (response: PaginatedResult<Categories>) => {
        this.categories.set(response);
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
      description: category.description,
    });

    this.isModalOpen.set(true);
  }

  saveCategory() {
    this.isSubmitted.set(true);

    const { name, description } = this.categoriesform.value;

    this.isLoading.set(true);

    if (this.selectedCategory === null) {
      this.createCategoryUseCase
        .execute({
          name,
          description,
        })
        .subscribe({
          next: () => {
            this.isLoading.set(false);
            this.loadCategories();
            this.isModalOpen.set(false);
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
            this.isModalOpen.set(false);
          },
          error: (err) => {
            this.isLoading.set(false);
            console.error(err);
          },
        });
    }
  }
}
