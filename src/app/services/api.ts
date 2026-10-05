import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { PostInterface } from '../Interface/jsonplaceholder.interface';

export interface ApiObject {
  id: string;
  userId: string;
  title: string;
  body: string;
}

export interface CommentObject {
  id: string;
  postId: string;
  email: string;
  name: string;
  body: string;
}
export interface User {
  id: number;
  name: string;
  email: string;
}


@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/';
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';
  users$!: Observable<User[]>; 
  constructor(private http: HttpClient) {
      this.users$ = this.http.get<User[]>(
      this.apiUrl
    ).pipe(
      shareReplay({
        bufferSize: 1,
        refCount: true
      })
    );
  }

  // GET all objects
  getAllObjects(): Observable<ApiObject[]> {
    return this.http.get<ApiObject[]>(this.baseUrl+'/posts');
  }

  // GET single object by id
  getObject(id: string): Observable<ApiObject> {
    return this.http.get<ApiObject>(`${this.baseUrl}/posts/${id}`);
  }

  getPosts(): Observable<PostInterface[]> {
    return this.http
      .get<PostInterface[]>(
        'https://jsonplaceholder.typicode.com/posts'
      )
      .pipe(map((posts) => posts || []));
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }
}
