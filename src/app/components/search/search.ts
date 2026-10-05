import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, exhaustMap, Subject, Subscription, switchMap } from 'rxjs';
import { ApiService } from '../../services/api';
import { ChildUserOne } from './child-user-one/child-user-one';
import { ChildUserTwo } from './child-user-two/child-user-two';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [CommonModule, ReactiveFormsModule,FormsModule, HttpClientModule, ChildUserOne, ChildUserTwo, RouterModule],
  templateUrl: './search.html',
  styleUrls: ['./search.scss'],
})
export class Search {
  searchQuery: string = '';
  private httpClient = inject(HttpClient);

  private fb = inject(FormBuilder);


  userForm: FormGroup = this.fb.group({
    name: [''],
    job: ['']
  });

// Subject that triggers the search
  private loadDataSubscription = new Subject<void>();
  // Subject to trigger POST requests
  private submitTrigger = new Subject<void>();
  response: Object | undefined;
  constructor() {
    // Subscribe once in the constructor
    this.loadDataSubscription.pipe(
            // 1. Wait until the user stops typing for 300ms
      debounceTime(300), 
      
      // 2. Only pass the value if it's different from the last checked text
      distinctUntilChanged(), 
      switchMap(() =>
        this.httpClient.get(`https://reqres.in/${this.searchQuery}`)
      )
    ).subscribe(
      (response) => {
        console.log('Search results:', response);
      },
      (error) => {
        console.error('Error occurred during search:', error);
      }
    );


    this.submitTrigger.pipe(
      exhaustMap(() => {
        const payload = this.userForm.value;
        console.log('Submitting payload:', payload);
        return this.httpClient.post('https://reqres.in/api/users', payload);
      })
    ).subscribe({
      next: (res) => {
        this.response = res;
        console.log('User created:', res);
      },
      error: (err) => console.error('Error:', err)
    });

  }

  // Call this when user clicks search
  onSearch() {
    this.loadDataSubscription.next(); // 🔑 This triggers the pipeline
  }

    onSubmit() {
    this.submitTrigger.next(); // 🚀 triggers exhaustMap pipeline
  }
}
