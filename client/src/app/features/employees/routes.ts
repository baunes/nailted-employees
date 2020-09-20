import { EmployeesListComponent } from './employees-list/employees-list.component';
import { NewEmployeeComponent } from './new-employee/new-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

export const ROUTES = [
  { path: '', component: EmployeesListComponent },
  { path: 'new', component: NewEmployeeComponent },
  { path: ':employeeId', component: ViewEmployeeComponent },
];
