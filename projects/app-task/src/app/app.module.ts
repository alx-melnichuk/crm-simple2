import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListModule } from './task-list/task-list.module';
import { TaskViewModule } from './task-view/task-view.module';
import { TaskApiService } from './services/task-api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TaskListModule,
    TaskViewModule
  ],
  providers: [
    TaskApiService
  ],
})
export class AppModule {
  constructor() {
    console.log('AppModule app-task');
  }
}
