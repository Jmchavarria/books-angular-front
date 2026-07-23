import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-minimal-top-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './minimal-top-bar.component.html',
})
export class MinimalTopBarComponent {}
