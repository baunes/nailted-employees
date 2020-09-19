import { PaggedDto } from '../../../core/paggedDto';
import { Pagination } from '../../../core/pagination';
import { Employee } from './employee';

export interface EmployeeRepository {
  getAllEmployees(pagination: Pagination, filter?: Filter): Promise<PaggedDto<Employee>>;
  createEmployee(employee: Employee): Promise<void>;
  findEmployeeById(id: number): Promise<Employee | undefined>;
}

export type Filter = (e: Employee) => boolean;
