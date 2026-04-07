import { Component, inject, OnInit } from '@angular/core';
import { ApiObject, ApiService } from '../../services/api';
import { selectPosts } from '../../store/selectors/post.selectors';
import { PostsApiActions } from '../../store/actions/post.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PostInterface } from '../../Interface/jsonplaceholder.interface';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
   objects: ApiObject[] = [];
isLoading = true;
 private store = inject(Store);
private api = inject(ApiService);
  posts$?: Observable<readonly PostInterface[]>;
  ngOnInit(): void {
        
  /*  
    this.api.getAllObjects().subscribe({
      next: (data) => {
        this.objects = data
        this.isLoading = false;
        console.log('Objects loaded:'+this.isLoading, this.objects);},
      error: (err) => console.error('Error loading objects:', err),
    });
    console.log('Home component initialized',this.objects);
    */

    this.posts$ = this.store.select(selectPosts);
    this.posts$.subscribe(posts => {
      console.log("Posts length:", posts.length);
      if(posts.length  == 0) {
            this.api
          .getPosts()
          .subscribe((posts) =>{
            console.log("Posts list:",posts);
            this.store.dispatch(PostsApiActions.retrievedPostList({ posts }));
          }
        );
      }
    });
  }

}
