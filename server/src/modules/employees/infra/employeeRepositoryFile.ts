import * as fs from 'fs';
import * as readline from 'readline';
import * as util from 'util';
import { Employee } from '../domain/employee';
import { EmployeeRepository, Filter, QueryOptions } from '../domain/repository';
import { ParseUtils } from '../../../utils/parseUtils';
import { EmployeeMapper } from '../mappers/employeeMapper';
import { Pagination } from '../../../core/pagination';
import { PaginationUtils } from '../../../utils/paginationUtils';
import { PaggedDto } from '../../../core/paggedDto';

const appendFile = util.promisify(fs.appendFile);
const fileEncoding = process.env.REPOSITORY_FILE_ENCODING || 'utf8';

export class EmployeeRepositoryFile implements EmployeeRepository {
  public constructor(private fileName: string) {}

  async getAllEmployees(pagination: Pagination, options?: QueryOptions): Promise<PaggedDto<Employee>> {
    return this.loadEmployeesFromFile(pagination, options || {});
  }

  private async loadEmployeesFromFile(pagination: Pagination, options: QueryOptions): Promise<PaggedDto<Employee>> {
    const [fromLimit, toLimit] = this.getLimitsForPagination(pagination);
    let currentIndex = 0;
    let totalItems = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream(this.fileName),
      crlfDelay: Infinity,
    });
    const employees = [];
    for await (const line of rl) {
      const employee = this.mapRowToEmployee(line);
      if (!options.filter || options.filter(employee)) {
        if (fromLimit < 0 || (fromLimit >= 0 && fromLimit <= currentIndex && currentIndex <= toLimit)) {
          employees.push(employee);
        }
        currentIndex++;
        totalItems++;
      }
    }

    if (options.sorter) {
      employees.sort(options.sorter);
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

  createEmployee(employee: Employee): Promise<void> {
    const row = ParseUtils.toCsvRow(EmployeeMapper.toStringRow(employee));
    return appendFile(this.fileName, row, fileEncoding);
  }

  findEmployeeById(id: number): Promise<Employee | undefined> {
    return this.findEmployeesFromFile(id);
  }

  private async findEmployeesFromFile(id: number): Promise<Employee | undefined> {
    const rl = readline.createInterface({
      input: fs.createReadStream(this.fileName),
      crlfDelay: Infinity,
    });
    let employee: Employee | undefined;
    for await (const line of rl) {
      const e = this.mapRowToEmployee(line);
      if (e.id == id) {
        employee = e;
      }
      if (e.id >= id) {
        break;
      }
    }
    return employee;
  }
}
