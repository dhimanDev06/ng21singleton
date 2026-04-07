import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Photos } from '../photos/photos';
import { Comments } from '../comments/comments';

@Component({
  selector: 'app-show',
  imports: [
    CommonModule,Photos,Comments
    
  ],
  templateUrl: './show.html',
  styleUrl: './show.scss',
})
export class Show {
  activeTab: 'home' | 'user' = 'home';
   setActive(tab: 'home' | 'user'): void {
    this.activeTab = tab;
  }
}
