import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'login',
        loadComponent: () => import('./core/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./core/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
    }

];
