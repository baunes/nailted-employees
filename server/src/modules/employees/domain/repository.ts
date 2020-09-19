import { PaggedDto } from '../../../core/paggedDto';
import { Pagination } from '../../../core/pagination';
import { Employee } from './employee';

export interface EmployeeRepository {
  getAllEmployees(pagination: Pagination): Promise<PaggedDto<Employee>>;
  // createEmployee(employee: Employee): void;
  // findEmployeeById(id: number): Employee | undefined;
}
