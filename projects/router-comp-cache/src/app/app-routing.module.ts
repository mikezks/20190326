import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { DefaultViewComponent } from './components/default-view/default-view.component';
import { ListViewComponent } from './components/list-view/list-view.component';
import { DetailViewComponent } from './components/detail-view/detail-view.component';

const outlets = [
  { name: 'left', param: 'dyn-view-left' },
  { name: 'right', param: 'dyn-view-right' }
];

const staticRoutes: Routes = [
  {
    path: '',
    redirectTo: '/overview/list-people',
    pathMatch: 'full'
  }
];

const compilerRoutes: Routes = [
  {
    path: 'default-view',
    component: DefaultViewComponent
  },
  {
    path: 'list-view',
    component: ListViewComponent
  },
  {
    path: 'detail-view',
    component: DetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot([
    ...staticRoutes,
    ...compilerRoutes
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
  outletRoutes = outlets.map(outlet => ({
    path: '',
    outlet: outlet.name,
    children: [
      ...compilerRoutes.map(route => ({
        path: `${ route.path }/:${ outlet.param }`,
        component: route.component
      }))
    ]
  }));

  constructor(private router: Router) {
    this.router.resetConfig([
      ...staticRoutes,
      ...this.outletRoutes
    ]);
  }
}
