import { Component } from '@angular/core';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [SearchBarComponent],
})
export class DashboardComponent {}
