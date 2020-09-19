import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/repository';

export class CreatetEmployee {
  constructor(private repository: EmployeeRepository) {}

  public async do(dto: CreateEmployeeDto): Promise<Employee> {
    const maxId = await this.repository.getMaxId();
    const employee = { ...dto, id: maxId + 1 };
    await this.repository.createEmployee(employee);
    return employee;
  }
}
