import { FormControl } from '@angular/forms';

export interface CategoryForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

export interface CategoryFormData {
  name: string;
  description: string;
}
