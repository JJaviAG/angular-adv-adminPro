import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';

import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { PagesRoutingModule } from './pages/pages.routing.module';


const routes: Routes = [
    //path: '/auth', AuthRouting
    //path: /pages, PagesRouting
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: NoPageFoundComponent },
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule,
        AuthRoutingModule
    ], exports: [RouterModule]
})
export class AppRoutingModule { }
