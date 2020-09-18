import * as fs from 'fs';
import * as readline from 'readline';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/repository';
import { ParseUtils } from '../../../utils/parseUtils';
import { EmployeeMapper } from '../mappers/employeeMapper';

export class EmployeeRepositoryFile implements EmployeeRepository {
  public constructor(private fileName: string) {}

  async getAllEmployees(): Promise<Employee[]> {
    return this.loadFile();
  }

  private async loadFile(): Promise<Employee[]> {
    const rl = readline.createInterface({
      input: fs.createReadStream(this.fileName),
      crlfDelay: Infinity,
    });
    const employees = [];
    for await (const line of rl) {
      employees.push(this.mapRowToEmployee(line));
    }
    return employees;
  }

  private mapRowToEmployee(row: string): Employee {
    return EmployeeMapper.toDomain(row.split(',').map((field) => ParseUtils.sanitizeString(field)));
  }
}
