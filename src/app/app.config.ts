import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { postsReducer } from './store/reducers/post.reducer';
import { authInterceptor } from './services/authInterceptor';
import { errorInterceptor } from './services/errorInterceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(
      withInterceptors([authInterceptor,errorInterceptor])
    ),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'posts', reducer: postsReducer }),
  ],
};
