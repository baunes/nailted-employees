import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContainersModule } from './containers/containers.module';
import { DefaultLayoutComponent } from './containers/default-layout/default-layout.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgbModule, ContainersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
