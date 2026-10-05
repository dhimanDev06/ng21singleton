import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-user-two',
  imports: [CommonModule],
  templateUrl: './child-user-two.html',
  styleUrl: './child-user-two.scss',
})
export class ChildUserTwo {
    private userService = inject(ApiService);
  users$ = this.userService.getUsers();
}
