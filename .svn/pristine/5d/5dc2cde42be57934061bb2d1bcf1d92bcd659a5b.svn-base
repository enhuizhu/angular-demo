import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TminusTwoComponent } from './components/tminus-two/tminus-two.component';
import { BolComponent } from './components/bol/bol.component';
import { TminusOneComponent } from './components/tminus-one/tminus-one.component';
import { GmexComponent } from './components/gmex/gmex.component';

const routes: Routes = [
 { 
    path: '', 
    component: GmexComponent,
    data: {
      title: 'GMEX'
    },
    children: [
      {
        path: '',
        redirectTo: 't-2',
        pathMatch: 'full'
      },
      {
        path: 't-2',
        component: TminusTwoComponent
      },
      {
        path: 't-1',
        component: TminusOneComponent
      },
      {
        path: 'bol',
        component: BolComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GmexRouterModule { }
