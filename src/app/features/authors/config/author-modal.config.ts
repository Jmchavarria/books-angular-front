import { ModalMode } from '../../../core/types/modal-mode.type';
import { ModalHeader } from '../../../core/types/modal.type';

export const AuthorsModalHeaders: Record<Exclude<ModalMode, null>, ModalHeader> = {
  create: {
    title: 'New author',
    description: 'Fill in the information to create a new author.',
  },
  edit: {
    title: 'Edit author',
    description: 'Update the author information.',
  },
  detail: {
    title: 'Author detail',
    description: 'View the detailed information of this author.',
  },
};

export const AUTHORS_DETAIL_TABS = [
  { id: 'info', label: 'Info' },
  { id: 'books', label: 'Books' },
];
