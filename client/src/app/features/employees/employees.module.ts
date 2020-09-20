import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './employees-list/sortable.directive';

@NgModule({
  declarations: [EmployeesListComponent, NgbdSortableHeader],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    RouterModule.forChild([{ path: '', component: EmployeesListComponent }]),
  ],
  bootstrap: [EmployeesListComponent],
})
export class EmployeesModule {}
