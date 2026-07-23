import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroShoppingCartSolid, heroUserSolid } from '@ng-icons/heroicons/solid';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [SearchBarComponent, NgIconComponent, RouterLink],
  providers: [
    provideIcons({
      heroShoppingCartSolid,
      heroUserSolid,
    }),
  ],
  templateUrl: './topbar.component.html',
})
export class TopBarComponent {}
