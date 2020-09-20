import * as fs from 'fs';
import * as readline from 'readline';
import * as util from 'util';
import { Employee } from '../../domain/employee';
import { EmployeeRepository, QueryOptions } from '../../domain/repository';
import { ParseUtils } from '../../../../utils/parseUtils';
import { EmployeeMapper } from '../../mappers/employeeMapper';
import { Pagination } from '../../../../core/pagination';
import { PaginationUtils } from '../../../../utils/paginationUtils';
import { PaggedDto } from '../../../../core/paggedDto';

const appendFile = util.promisify(fs.appendFile);
const fileEncoding = process.env.REPOSITORY_FILE_ENCODING || 'utf8';

export class EmployeeRepositoryFile implements EmployeeRepository {
  public constructor(private fileName: string) {}

  async getAllEmployees(pagination: Pagination, options?: QueryOptions): Promise<PaggedDto<Employee>> {
    return this.loadEmployeesFromFile(pagination, options || {});
  }

  private async loadEmployeesFromFile(pagination: Pagination, options: QueryOptions): Promise<PaggedDto<Employee>> {
    const [fromLimit, toLimit] = this.getLimitsForPagination(pagination);
    let totalItems = 0;
    let employees = [];
    for await (const line of this.getLinesIterator()) {
      const employee = this.mapRowToEmployee(line);
      if (!options.filter || options.filter(employee)) {
        employees.push(employee);
        totalItems++;
      }
    }

    if (options.sorter) {
      employees.sort(options.sorter);
    }

    if (fromLimit >= 0 && toLimit > 0) {
      employees = employees.slice(fromLimit, toLimit + 1);
    }

    const paginationWithTotals = PaginationUtils.createPaginationWithTotals(pagination, totalItems);
    return new PaggedDto(paginationWithTotals, employees);
  }

  private mapRowToEmployee(row: string): Employee {
    return EmployeeMapper.toDomain(ParseUtils.fromCsvRow(row));
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
    let employee: Employee | undefined;
    for await (const line of this.getLinesIterator()) {
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

  getMaxId(): Promise<number> {
    return this.getMaxIdFromFile();
  }

  private async getMaxIdFromFile(): Promise<number> {
    let maxId = 0;
    for await (const line of this.getLinesIterator()) {
      const e = this.mapRowToEmployee(line);
      maxId = Math.max(maxId, e.id);
    }
    return maxId;
  }

  private getLinesIterator(): readline.Interface {
    return readline.createInterface({
      input: fs.createReadStream(this.fileName),
      crlfDelay: Infinity,
    });
  }
}
