import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Importas desde la carpeta relativa './sidebar/...'
import { SidebarAdminCompoonent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarAdminCompoonent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {}
