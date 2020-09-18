import { Pagination } from '../../../core/pagination';
import { Employee } from './employee';

export interface EmployeeRepository {
  getAllEmployees(pagination?: Pagination): Promise<Employee[]>;
  // createEmployee(employee: Employee): void;
  // findEmployeeById(id: number): Employee | undefined;
}
