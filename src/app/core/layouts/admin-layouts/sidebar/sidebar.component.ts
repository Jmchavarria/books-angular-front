import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IconType, NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroBookOpenSolid,
  heroChartBarSolid,
  heroChevronLeftSolid,
  heroChevronRightSolid,
  heroSquares2x2Solid,
  heroUserGroupSolid,
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
    heroBookOpenSolid,
    heroUserGroupSolid,
  }),
  imports: [RouterLink, RouterLinkActive, NgIcon],
  templateUrl: './sidebar.component.html',
})
export class SidebarAdminCompoonent {
  isCollapsed = signal(false);

  @HostListener('document:keydown.control.b')
  handleKeyEvent(): void {
    this.toggleSidebar();
  }

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
    {
      id: 3,
      name: 'Books',
      icon: 'heroBookOpenSolid',
      route: '/admin/books',
    },
    {
      id: 3,
      name: 'Authors',
      icon: 'heroUserGroupSolid ',
      route: '/admin/authors',
    },
  ];

  toggleSidebar(): void {
    this.isCollapsed.update((v) => !v);
  }
}
