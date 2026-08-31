import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconType, NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChartBarSolid,
  heroChevronLeftSolid,
  heroChevronRightSolid,
  heroSquares2x2Solid,
  heroUsersSolid,
} from '@ng-icons/heroicons/solid';

export interface ModuleItems {
  id: number;
  name: string;
  route: string;
  icon: IconType;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  providers: provideIcons({
    heroChevronRightSolid,
    heroChevronLeftSolid,
    heroUsersSolid,
    heroChartBarSolid,
    heroSquares2x2Solid,
  }),
  imports: [RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.component.html',
})
export class SidebarAdminCompoonent {
  isCollapsed = signal(false);

  modules: ModuleItems[] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'heroChartBarSolid ',
      route: '/admin/dashboard',
    },
    {
      id: 2,
      name: 'Users',
      icon: 'heroUsersSolid',
      route: '/admin/users',
    },
    {
      id: 3,
      name: 'Categories',
      icon: 'heroSquares2x2Solid ',
      route: '/admin/categories',
    },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update((v) => !v);
  }
}
