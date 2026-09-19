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
