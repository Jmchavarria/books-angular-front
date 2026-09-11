import { FormControl } from '@angular/forms';

export interface BookForm {
  title: FormControl<string>;
  pages: FormControl<number>;
  description: FormControl<string>;
  publishedYear: FormControl<number>;
  author: FormControl<number>;
  category: FormControl<number>;
}

export interface BookFormData {
  title: string;
  description: string;
  publishedYear: number;
  pages: number;
  author: number;
  category: number;
}
