import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee, PaggedEmployee } from './employee';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private employeesUrl = 'api/employee';

  constructor(private http: HttpClient) {}

  findById(employeeId: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeesUrl}/${employeeId}`);
  }

  getEmployees(
    page: number = 0,
    size: number = 10,
    email?: string
  ): Observable<PaggedEmployee> {
    let params: any = {
      page: page.toString(),
      size: size.toString(),
      nameOrder: 1,
      surnameOrder: 1,
    };
    if (email) {
      params.email = email;
    }
    return this.http.get<PaggedEmployee>(this.employeesUrl, {
      params,
    });
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeesUrl, employee);
  }
}
