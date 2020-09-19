import { PaggedDto } from '../../../core/paggedDto';
import { Pagination } from '../../../core/pagination';
import { Employee } from '../domain/employee';
import { EmployeeRepository, QueryOptions } from '../domain/repository';

export class GetEmployees {
  constructor(private repository: EmployeeRepository) {}

  public do(
    pagination: Pagination,
    email: string | undefined = undefined,
    nameOrder = 0,
    surnameOrder = 0,
  ): Promise<PaggedDto<Employee>> {
    const options: QueryOptions = {};
    options.filter = email ? (e) => e.email.includes(email) : undefined;
    options.sorter = (e1, e2) => {
      const byName = nameOrder * e1.name.localeCompare(e2.name);
      if (byName === 0) {
        return surnameOrder * e1.surname.localeCompare(e2.surname);
      } else {
        return byName;
      }
    };

    return this.repository.getAllEmployees(pagination, options);
  }
}
