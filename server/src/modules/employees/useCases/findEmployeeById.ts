import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/repository';

export class FindEmployeeById {
  constructor(private repository: EmployeeRepository) {}

  public async do(id: number): Promise<Employee | undefined> {
    const employee = await this.repository.findEmployeeById(id);
    return employee;
  }
}
