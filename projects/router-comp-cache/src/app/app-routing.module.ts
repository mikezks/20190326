import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultViewComponent } from './components/default-view/default-view.component';
import { ListItemsViewComponent } from './components/list-items-view/list-items-view.component';
import { TableViewComponent } from './components/table-view/table-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dyn-list-items-people/dyn-table',
    pathMatch: 'full'
  },
  {
    path: '',
    outlet: 'left',
    children: [
      {
        path: 'default-view/:dyn-view-left',
        component: DefaultViewComponent
      },
      {
        path: 'list-items-view/:dyn-view-left',
        component: ListItemsViewComponent
      },
      {
        path: 'table-view/:dyn-view-left',
        component: TableViewComponent
      }
    ]
  },
  {
    path: '',
    outlet: 'right',
    children: [
      {
        path: 'default-view/:dyn-view-right',
        component: DefaultViewComponent
      },
      {
        path: 'list-items-view/:dyn-view-right',
        component: ListItemsViewComponent
      },
      {
        path: 'table-view/:dyn-view-right',
        component: TableViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
