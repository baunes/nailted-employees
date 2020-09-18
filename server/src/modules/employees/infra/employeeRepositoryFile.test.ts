import { Pagination } from '../../../core/pagination';
import { EmployeeRepositoryFile } from './employeeRepositoryFile';

const employeesFile = `${process.cwd()}/test-assets/employees.txt`;

describe('EmployeeRepositoryFile', () => {
  const repository = new EmployeeRepositoryFile(employeesFile);

  test('loads all rows', async (done) => {
    const employees = await repository.getAllEmployees();

    expect(employees).toHaveLength(30);

    done();
  });

  test('parse all rows', async (done) => {
    const employees = await repository.getAllEmployees();

    expect(employees[0].id).toBe(1);
    expect(employees[0].name).toBe('Della');
    expect(employees[0].surname).toBe('Cox');
    expect(employees[0].address).toBe('4945 Lucky Duck Drive');
    expect(employees[0].phone).toBe('412-862-8457');
    expect(employees[0].email).toBe('DellaDCox@superrito.com');
    expect(employees[0].birthdate.getUTCDate()).toBe(12);
    expect(employees[0].birthdate.getUTCMonth() + 1).toBe(10);
    expect(employees[0].birthdate.getUTCFullYear()).toBe(1985);

    expect(employees[29].id).toBe(30);
    expect(employees[29].name).toBe('Donald');
    expect(employees[29].surname).toBe('Schmidt');
    expect(employees[29].address).toBe('1925 Mattson Street');
    expect(employees[29].phone).toBe('503-431-9711');
    expect(employees[29].email).toBe('DonaldBSchmidt@rhyta.com');
    expect(employees[29].birthdate.getUTCDate()).toBe(27);
    expect(employees[29].birthdate.getUTCMonth() + 1).toBe(11);
    expect(employees[29].birthdate.getUTCFullYear()).toBe(1952);

    done();
  });

  test('loads rows by page(0,2)', async (done) => {
    const employees = await repository.getAllEmployees(Pagination.basic(0, 2));

    expect(employees).toHaveLength(2);
    expect(employees[0].id).toBe(1);
    expect(employees[1].id).toBe(2);

    done();
  });

  test('loads rows by page(3,5)', async (done) => {
    const employees = await repository.getAllEmployees(Pagination.basic(3, 5));

    expect(employees).toHaveLength(5);
    expect(employees[0].id).toBe(16);
    expect(employees[1].id).toBe(17);
    expect(employees[2].id).toBe(18);
    expect(employees[3].id).toBe(19);
    expect(employees[4].id).toBe(20);

    done();
  });
});
