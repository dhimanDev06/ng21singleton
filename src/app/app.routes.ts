import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home').then(m => m.Home)
    },
    {
        path: 'user',
        loadComponent: () => import('./components/user/user').then(m => m.User)
    },
    {
            path: 'tabs'
            , loadComponent: () => import('./components/tab/show/show').then(m => m.Show)
    },
    {
        path: 'registration'
        , loadComponent: () => import('./components/registration/registration').then(m => m.Registration)
    },
    {
        path: 'search'
        , loadComponent: () => import('./components/search/search').then(m => m.Search)
    },
    {
        path: 'rxjs'
        , loadComponent: () => import('./components/rxjs-test/rxjs-test').then(m => m.RxjsTest)
    }
];
