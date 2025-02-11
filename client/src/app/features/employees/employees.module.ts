import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ROUTES } from './routes';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

@NgModule({
  declarations: [EmployeesListComponent, NewEmployeeComponent, ViewEmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild(ROUTES),
  ],
  bootstrap: [EmployeesListComponent],
})
export class EmployeesModule {}
