import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

/**
 * import all the page components
 */
import { HomeComponent } from './pages/home/home.component';
import { WatchListComponent } from './pages/watch-list/watch-list.component';
import { UpcomingComponent } from './pages/upcoming/upcoming.component';
import { CompeletedComponent } from './pages/compeleted/compeleted.component';
import { ReportComponent } from './pages/report/report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


/**
 * import all the modules
 */
import { GmexModule } from './modules/gmex/gmex.module';


const appRoutes = [
  {
    path: '', 
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: 'gmex',
    loadChildren: 'app/modules/gmex/gmex.module#GmexModule'
  },
  {
    path: 'query',
    loadChildren: 'app/modules/query/query.module#QueryModule'
  },
  {
    path: 'report',
    component: ReportComponent,
    children: [
      {
        path: '', 
        redirectTo: 'watch-list', 
        pathMatch: 'full'
      },
      { 
        path: 'watch-list', 
        component: WatchListComponent,
        data: { 
          title: 'Ops Watchlist', 
        },
      },
      { 
        path: 'upcoming', 
        component: UpcomingComponent,
        data: { 
          title: 'UPCOMING', 
        },
      },
      { 
        path: 'compeleted', 
        component: CompeletedComponent,
        data: { 
          title: 'COMPELETED', 
        },
      }
    ]
  },
  {
    path: '**', 
    component: 
    NotFoundComponent,
    data: {
      title: '404'
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false, useHash: true}),    
  ],
})
export class AppRouterModule { }
