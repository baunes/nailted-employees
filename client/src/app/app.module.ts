import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContainersModule } from './containers/containers.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ContainersModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      {
        path: 'employees',
        loadChildren: () =>
          import('./features/employees/employees.module').then(
            (m) => m.EmployeesModule
          ),
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
