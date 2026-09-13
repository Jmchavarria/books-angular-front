import { Component, input } from '@angular/core';
import { User } from '../../../domain/entities/users.entity';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  templateUrl: './user-detail.component.html',
})
export class UserDetailComponent {
  user = input.required<User>();
}
