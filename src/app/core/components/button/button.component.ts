import { Component, input, output } from '@angular/core';

type TypeButton = 'reset' | 'submit' | 'button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  typeButton = input<TypeButton>();
  label = input<string>();
  onSubmit = output<void>();

  handleSubmit() {
    this.onSubmit.emit();
  }
}
