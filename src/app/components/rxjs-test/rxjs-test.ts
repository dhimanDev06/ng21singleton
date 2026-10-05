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

  userData: any;

  constructor() {

    console.log('🟢 Component Created');

    this.apiService.getAllObjects().pipe(

      // takeUntilDestroyed(this.destroyRef), 
      // If you use takeUntilDestroyed(this.destroyRef), you normally do not need ngOnDestroy() just for subscription cleanup.

      takeUntil(this.destroy$),

      finalize(() => {
        console.log('🔴 Observable Unsubscribed / Completed');
      })

    ).subscribe((users) => {

      this.userData = users;

      console.log('👤 Users:', this.userData);

    });

  }

  ngOnDestroy(): void {

    console.log('⚠️ ngOnDestroy called');

    console.log('Before destroy:', this.userData);

    // This tells takeUntil() to unsubscribe
    this.destroy$.next();

    // Complete destroy$
    this.destroy$.complete();

    console.log('✅ destroy$ completed');

    console.log('After destroy:', this.userData);

  }

}
