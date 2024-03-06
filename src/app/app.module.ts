import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CreateTaskComponent } from './components/create-task/create-task.component';
import { ColourSelectionComponent } from './components/colour-selection/colour-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconSelectionComponent } from './components/icon-selection/icon-selection.component';

@NgModule({
  declarations: [AppComponent, CreateTaskComponent, ColourSelectionComponent, IconSelectionComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
