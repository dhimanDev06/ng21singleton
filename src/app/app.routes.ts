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
    }
];
