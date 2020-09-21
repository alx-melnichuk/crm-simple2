import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { ClientListResolverService } from './client-list/resolvers/client-list-resolver.service';
import { ClientResolverService } from './client-view/resolvers/client-resolver.service';
import { RB_LIST, RB_VIEW_CLIENT_ID } from './app.consts';

const itemRoutes: Routes = [
  {
    path: RB_LIST,
    component: ClientListComponent,
    resolve: {
      clientList: ClientListResolverService
    }
  },
  {
    path: RB_VIEW_CLIENT_ID,
    component: ClientViewComponent,
    resolve: {
      client: ClientResolverService
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
    ClientListResolverService,
    ClientResolverService
  ]
})
export class AppRoutingModule { }
