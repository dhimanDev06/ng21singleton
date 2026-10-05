import { Component, DestroyRef, inject, OnDestroy } from '@angular/core';
import { ApiService } from '../../services/api';
import { finalize, Subject, take, takeUntil } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-rxjs-test',
  imports: [RouterModule],
  templateUrl: './rxjs-test.html',
  styleUrl: './rxjs-test.scss',
})
export class RxjsTest implements OnDestroy {
  private destroyRef = inject(DestroyRef);
  private apiService = inject(ApiService);
  private destroy$ = new Subject<void>();
  userData:any;
  constructor() {
    this.apiService.getAllObjects().pipe(
      // takeUntilDestroyed(this.destroyRef),
      takeUntil(this.destroy$),
      finalize(() => console.log('Unsubscribed!'))
    ).subscribe((users) => {
      this.userData = users;
      console.log('Users:', this.userData);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    console.log('Users:', this.userData);

    // alert("Dhiman");
    // throw new Error('Method not implemented.');
  }
}
