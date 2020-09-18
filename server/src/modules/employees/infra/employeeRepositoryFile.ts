import * as fs from 'fs';
import * as readline from 'readline';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/repository';
import { ParseUtils } from '../../../utils/parseUtils';

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
    return this.toDomain(row.split(',').map((field) => ParseUtils.sanitizeString(field)));
  }

  private toDomain(row: string[]): Employee {
    return new Employee(Number.parseInt(row[0]), row[1], row[2], row[3], row[4], row[5], ParseUtils.parseDate(row[6]));
  }
}
