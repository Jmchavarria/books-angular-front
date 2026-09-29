import { Component, computed, OnInit, signal } from '@angular/core';
import {
  objectData,
  TableComponent,
} from '../../../../../core/layouts/admin-layouts/table/table.component';
import { Categories } from '../../../domain/entities/categories.entity';
import { GetAllCategoriesUseCase } from '../../../application/admin/use-cases/get-all-categories/get-all-categories-use-case';
import { CreateCategoryUseCase } from '../../../application/admin/use-cases/create-category/create-category.use-case';
import { UpdateCategoryUseCase } from '../../../application/admin/use-cases/update-category/update-category.use-case';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { ButtonComponent } from '../../../../../core/components/button/button.component';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { TableAction } from '../../../../../core/types/table.type';
import { PaginatedResult } from '../../../../../core/types/paginated-response';
import { DropdownComponent } from '../../../../../core/components/dropdown/dropdown.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  CATEGORIES_COLUMNS,
  CATEGORIES_TABLE_ACTIONS,
} from '../../../config/categories-table.config';
import { TableUtilsService } from '../../../../../core/services/table-utils.service';
import { PaginationComponent } from '../../../../../core/components/pagination/pagination.component';
import { ModalHeader } from '../../../../../core/types/modal.type';
import { CategoriesModalHeaders } from '../../../config/categories-modal.config';
import { ModalMode } from '../../../../../core/types/modal-mode.type';
import { GetAllCategoriesDto } from '../../../application/admin/use-cases/get-all-categories/get-all-categories.dto';
import { CategoryFormData } from '../../../types/category-form.types';
import { UserFormComponent } from '../../../components/category-form/category-form.component';
import { heroEllipsisVerticalSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [provideIcons({ heroEllipsisVerticalSolid })],
  imports: [
    TableComponent,
    ModalComponent,
    ButtonComponent,
    SearchBarComponent,
    DropdownComponent,
    NgIcon,
    PaginationComponent,
    UserFormComponent,
  ],

  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
  isSubmitted = signal<boolean>(false);
  isLoading = signal<boolean>(false);
  categories = signal<objectData<Categories>>({
    data: [],
    limit: 0,
    page: 0,
    total: 0,
    totalPages: 0,
  });
  modalMode = signal<ModalMode>(null);
  readonly columns = CATEGORIES_COLUMNS;
  readonly actions = CATEGORIES_TABLE_ACTIONS;
  isModalOpen = signal<boolean>(false);
  selectedCategory = signal<Categories | null>(null);

  constructor(
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    public readonly tableUtilsService: TableUtilsService<Categories>,
  ) {}

  readonly modalHeader = computed<ModalHeader>(() => {
    const mode: Exclude<ModalMode, null> | null = this.modalMode();

    if (mode === null) {
      return {
        title: '',
        description: '',
      };
    }

    return CategoriesModalHeaders[mode];
  });

  ngOnInit(): void {
    this.loadCategories();
  }

  closeModal() {
    this.modalMode.set(null);
    this.selectedCategory.set(null);
    // this.currentTab.set('info');
  }

  onAction(event: { action: TableAction; item: Categories }) {
    switch (event.action.key) {
      case 'edit':
        this.openEdit(event.item);
        break;
    }
  }

  loadCategories(filters?: GetAllCategoriesDto): void {
    this.getAllCategoriesUseCase.execute(filters).subscribe({
      next: (response: PaginatedResult<Categories>) => {
        this.categories.set(response);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openEdit(category: Categories): void {
    this.selectedCategory.set(category);

    this.modalMode.set('edit');
  }

  openCreate(): void {
    this.selectedCategory.set(null);
    this.modalMode.set('create');
  }

  openDetail(category: Categories): void {
    this.selectedCategory.set(category);
    this.modalMode.set('detail');
  }

  private createCategory(category: CategoryFormData): void {
    this.isLoading.set(true);

    this.createCategoryUseCase
      .execute({
        name: category.name,
        description: category.description,
      })
      .subscribe({
        next: () => {
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

  private updateCategory(categoryForm: CategoryFormData): void {
    const category = this.selectedCategory();

    if (!category) {
      return;
    }

    this.isLoading.set(true);

    this.updateCategoryUseCase
      .execute({
        id: category.id,
        name: categoryForm.name,
        description: categoryForm.description,
      })
      .subscribe({
        next: () => {
          this.loadCategories();
          this.closeModal();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }

  saveCategory(category: CategoryFormData): void {
    switch (this.modalMode()) {
      case 'create':
        this.createCategory(category);
        break;

      case 'edit':
        this.updateCategory(category);
        break;
    }
  }
}
