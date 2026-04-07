import { Component, OnInit } from '@angular/core';
import { ApiObject, ApiService } from '../../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.scss',
})
export class User implements OnInit {
  object: any;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getObject('7').subscribe({
      next: (data) => {
        this.object = data;
        console.log('Object loaded:', this.object);},
      error: (err) => console.error('Error loading object 7:', err),
    });
  }
}
