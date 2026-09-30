import { FormControl } from '@angular/forms';

export interface AuthorForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  biography: FormControl<string>;
  birthdate: FormControl<Date>;
  deathdate: FormControl<Date>;
  countryOfBirth: FormControl<string>;
}

export interface AuthorFormData {
  firstName: string;
  lastName: string;
  birthdate: Date;
  deathdate: Date;
  biography: string;
  countryOfBirth: string;
}
