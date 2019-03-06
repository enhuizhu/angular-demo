import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './components/query/query.component';
import { SwapComponent } from './components/swap/swap.component';

const routes: Routes = [
  { 
     path: '', 
     component: QueryComponent,
     data: {
       title: 'QUERY'
     },
     children: [
       {
         path: '',
         redirectTo: 'swap',
         pathMatch: 'full'
       },
       {
         path: 'swap',
         component: SwapComponent
       }
     ]
   },
 ];
 
 @NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
 })
 export class QueryRouterModule { }
