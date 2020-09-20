import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EmployeeService } from '../employees.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Employee, PaggedEmployee } from '../employee';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  providers: [EmployeeService, DatePipe],
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  email?: string;
  isLoading = false;
  employees$ = new BehaviorSubject<Employee[]>([]);
  total$ = new BehaviorSubject<number>(0);

  private _page = 1;
  private _pageSize = 10;
  private subscription: Subscription;

  constructor(public service: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  get page(): number {
    return this._page;
  }
  set page(page: number) {
    this._page = page;
    this.loadEmployees();
  }

  get pageSize(): number {
    return this._pageSize;
  }
  set pageSize(pageSize: number) {
    this._pageSize = pageSize;
    this.loadEmployees();
  }

  onCleanFilters(): void {
    this.email = undefined;
  }

  onSearch(): void {
    this.loadEmployees();
  }

  private loadEmployees(): void {
    this.isLoading = true;
    const subscription = this.service
      .getEmployees(this.page - 1, this.pageSize, this.email)
      .subscribe((paggedEmployee: PaggedEmployee) => {
        this.employees$.next(paggedEmployee.items);
        this.total$.next(paggedEmployee.pagination.totalItems);
      });
    this.isLoading = false;
  }
}
