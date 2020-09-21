import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientListModule } from './client-list/client-list.module';
import { ClientViewModule } from './client-view/client-view.module';
import { ClientApiService } from './services/client-api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ClientListModule,
    ClientViewModule
  ],
  providers: [
    ClientApiService
  ],
})
export class AppModule {
  constructor() {
    console.log('AppModule app-client');
  }
}
