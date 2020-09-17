import { Employee } from './employee';

export interface EmployeeRepository {
  getAllEmployees(): Promise<Employee[]>;
  // createEmployee(employee: Employee): void;
  // findEmployeeById(id: number): Employee | undefined;
}
