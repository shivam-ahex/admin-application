import { AuthGuard } from '@angular/fire/auth-guard';
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
        path: 'dashboard',
        loadComponent: () => import('./core/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'forget-password',
        loadComponent: () => import('./core/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent)
    },
    {
        path: 'reset-password',
        loadComponent: ()=>import("./core/reset-password/reset-password.component").then(m=>m.ResetPasswordComponent)
    },
    {
        path:'**',
        redirectTo:'login',
        pathMatch:'full'
    }

];
