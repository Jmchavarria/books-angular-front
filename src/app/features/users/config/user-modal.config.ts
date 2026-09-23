import { ModalHeader } from '../../../core/types/modal.type';
import { ModalMode } from '../types/user-modal.type';

export const UsersmodalHeaders: Record<Exclude<ModalMode, null>, ModalHeader> = {
  create: {
    title: 'New user',
    description: 'Fill in the information to create a new user.',
  },
  edit: {
    title: 'Edit user',
    description: "Update the user's information.",
  },
  detail: {
    title: 'User detail',
    description: "View the user's information.",
  },
};

export const USER_DETAIL_TABS = [
  { id: 'info', label: 'Info' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'orders', label: 'Orders' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'cart', label: 'Cart' },
];
