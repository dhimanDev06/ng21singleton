import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-comments',
  imports: [CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments implements OnInit {
  ngOnInit(): void {
  }

}
