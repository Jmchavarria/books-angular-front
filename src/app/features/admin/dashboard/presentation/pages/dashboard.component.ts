import { Component, OnInit } from '@angular/core';
import { SearchBarComponent } from '../../../../../shared/components/search-bar/search-bar.component';
import { SidebarAdminCompoonent } from '../../../../../core/layouts/admin-layouts/sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [SidebarAdminCompoonent, SearchBarComponent],
})
export class DashboardComponent {}
