import * as fs from 'fs';
import * as readline from 'readline';
import { Employee } from '../domain/employee';
import { EmployeeRepository } from '../domain/repository';
import { ParseUtils } from '../../../utils/parseUtils';
import { EmployeeMapper } from '../mappers/employeeMapper';
import { Pagination } from '../../../core/pagination';
import { PaginationUtils } from '../../../utils/paginationUtils';
import { PaggedDto } from '../../../core/paggedDto';

export class EmployeeRepositoryFile implements EmployeeRepository {
  public constructor(private fileName: string) {}

  async getAllEmployees(pagination: Pagination): Promise<PaggedDto<Employee>> {
    return this.loadEmployeesFromFile(pagination);
  }

  private async loadEmployeesFromFile(pagination: Pagination): Promise<PaggedDto<Employee>> {
    const [fromLimit, toLimit] = this.getLimitsForPagination(pagination);
    let currentIndex = 0;
    let totalItems = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(this.fileName),
      crlfDelay: Infinity,
    });
    const employees = [];
    for await (const line of rl) {
      if (fromLimit < 0 || (fromLimit >= 0 && fromLimit <= currentIndex && currentIndex <= toLimit)) {
        employees.push(this.mapRowToEmployee(line));
      }
      currentIndex++;
      totalItems++;
    }
    const paginationWithTotals = PaginationUtils.createPaginationWithTotals(pagination, totalItems);
    return new PaggedDto(paginationWithTotals, employees);
  }

  private mapRowToEmployee(row: string): Employee {
    return EmployeeMapper.toDomain(row.split(',').map((field) => ParseUtils.sanitizeString(field)));
  }

  private getLimitsForPagination(pagination: Pagination): [number, number] {
    return [PaginationUtils.getLowerLimit(pagination), PaginationUtils.getUpperLimit(pagination)];
  }
}
