import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface ModuleItems {
  id: number;
  name: string;
  route: string;
  icon: Element | string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
})
export class SidebarAdminCompoonent {
  modules: ModuleItems[] = [
    {
      id: 1,
      name: 'dashboard',
      icon: '',
      route: '/admin/dashboard',
    },
    {
      id: 2,
      name: 'users',
      icon: '',
      route: '/admin/users',
    },
  ];
}
