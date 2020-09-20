import { DatePipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { EmployeeService } from './employees.service';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  providers: [EmployeeService, DatePipe],
})
export class EmployeesListComponent {
  employees$: Observable<Employee[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: EmployeeService) {
    this.employees$ = service.employees$;
    this.total$ = service.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach((header) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
