import { ModalMode } from '../../../core/types/modal-mode.type';
import { ModalHeader } from '../../../core/types/modal.type';

export const CategoriesModalHeaders: Record<Exclude<ModalMode, null>, ModalHeader> = {
  create: {
    title: 'New category',
    description: 'Fill in the information to create a new category.',
  },
  edit: {
    title: 'Edit category',
    description: 'Update the category information.',
  },
  detail: {
    title: 'Category detail',
    description: 'View the detailed information of this category.',
  },
};

export const CATEGORIES_DETAIL_TABS = [
  { id: 'info', label: 'Info' },
  { id: 'books', label: 'Subcategories' },
];
