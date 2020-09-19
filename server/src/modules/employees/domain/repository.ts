import { PaggedDto } from '../../../core/paggedDto';
import { Pagination } from '../../../core/pagination';
import { Employee } from './employee';

export interface EmployeeRepository {
  getAllEmployees(pagination: Pagination, options?: QueryOptions): Promise<PaggedDto<Employee>>;
  createEmployee(employee: Employee): Promise<void>;
  findEmployeeById(id: number): Promise<Employee | undefined>;
  getMaxId(): Promise<number>;
}

export type Filter = (e: Employee) => boolean;
export type Sorter = (a: Employee, b: Employee) => number;

export interface QueryOptions {
  filter?: Filter;
  sorter?: Sorter;
}
