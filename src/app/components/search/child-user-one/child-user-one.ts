import { Component, inject } from '@angular/core';
import { ApiService } from '../../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-child-user-one',
  imports: [CommonModule],
  templateUrl: './child-user-one.html',
  styleUrl: './child-user-one.scss',
})
export class ChildUserOne {
    private userService = inject(ApiService);
  users$ = this.userService.getUsers();
}
