import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChatBubbleLeftSolid, heroGlobeAltSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [NgIcon],
  providers: [provideIcons({ heroGlobeAltSolid, heroChatBubbleLeftSolid })],
  templateUrl: './footer.component.html',
})
export class FooterComponent {}
