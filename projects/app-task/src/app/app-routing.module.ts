import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskViewComponent } from './task-view/task-view.component';
import { RB_LIST, RB_VIEW_TASK_ID } from './app.consts';
import { TaskListResolverService } from './task-list/resolvers/task-list-resolver.service';
import { TaskResolverService } from './task-view/resolvers/task-resolver.service';

const itemRoutes: Routes = [
  {
    path: RB_LIST,
    component: TaskListComponent,
    resolve: {
      taskList: TaskListResolverService
    }
  },
  {
    path: RB_VIEW_TASK_ID,
    component: TaskViewComponent,
    resolve: {
      task: TaskResolverService
    }
  },
  {
    path: '**',
    redirectTo: RB_LIST
  }
];

const routes: Routes = [
  { path: '', component: AppComponent, children: itemRoutes }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TaskListResolverService,
    TaskResolverService
  ]
})
export class AppRoutingModule { }
