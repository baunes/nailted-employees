import { Pagination } from '../../../core/pagination';
import { EmployeeRepositoryFile } from './employeeRepositoryFile';

const employeesFile = `${process.cwd()}/test-assets/employees.txt`;

describe('EmployeeRepositoryFile', () => {
  const repository = new EmployeeRepositoryFile(employeesFile);

  test('loads all rows', async (done) => {
    const pagedEmployees = await repository.getAllEmployees(Pagination.none());

    expect(pagedEmployees.items).toHaveLength(30);
    expect(pagedEmployees.pagination.page).toBe(0);
    expect(pagedEmployees.pagination.totalItems).toBe(30);
    expect(pagedEmployees.pagination.totalPages).toBe(1);
    expect(pagedEmployees.pagination.hasPrevious).toBe(false);
    expect(pagedEmployees.pagination.hasNext).toBe(false);

    done();
  });

  test('parse all rows', async (done) => {
    const pagedEmployees = await repository.getAllEmployees(Pagination.none());

    expect(pagedEmployees.items[0].id).toBe(1);
    expect(pagedEmployees.items[0].name).toBe('Della');
    expect(pagedEmployees.items[0].surname).toBe('Cox');
    expect(pagedEmployees.items[0].address).toBe('4945 Lucky Duck Drive');
    expect(pagedEmployees.items[0].phone).toBe('412-862-8457');
    expect(pagedEmployees.items[0].email).toBe('DellaDCox@superrito.com');
    expect(pagedEmployees.items[0].birthdate.getUTCDate()).toBe(12);
    expect(pagedEmployees.items[0].birthdate.getUTCMonth() + 1).toBe(10);
    expect(pagedEmployees.items[0].birthdate.getUTCFullYear()).toBe(1985);

    expect(pagedEmployees.items[29].id).toBe(30);
    expect(pagedEmployees.items[29].name).toBe('Donald');
    expect(pagedEmployees.items[29].surname).toBe('Schmidt');
    expect(pagedEmployees.items[29].address).toBe('1925 Mattson Street');
    expect(pagedEmployees.items[29].phone).toBe('503-431-9711');
    expect(pagedEmployees.items[29].email).toBe('DonaldBSchmidt@rhyta.com');
    expect(pagedEmployees.items[29].birthdate.getUTCDate()).toBe(27);
    expect(pagedEmployees.items[29].birthdate.getUTCMonth() + 1).toBe(11);
    expect(pagedEmployees.items[29].birthdate.getUTCFullYear()).toBe(1952);

    done();
  });

  test('loads rows by page(0,2)', async (done) => {
    const pagedEmployees = await repository.getAllEmployees(Pagination.basic(0, 2));

    expect(pagedEmployees.items).toHaveLength(2);
    expect(pagedEmployees.items[0].id).toBe(1);
    expect(pagedEmployees.items[1].id).toBe(2);
    expect(pagedEmployees.pagination.page).toBe(0);
    expect(pagedEmployees.pagination.totalItems).toBe(30);
    expect(pagedEmployees.pagination.totalPages).toBe(15);
    expect(pagedEmployees.pagination.hasPrevious).toBe(false);
    expect(pagedEmployees.pagination.hasNext).toBe(true);

    done();
  });

  test('loads rows by page(3,5)', async (done) => {
    const pagedEmployees = await repository.getAllEmployees(Pagination.basic(3, 5));

    expect(pagedEmployees.items).toHaveLength(5);
    expect(pagedEmployees.items[0].id).toBe(16);
    expect(pagedEmployees.items[1].id).toBe(17);
    expect(pagedEmployees.items[2].id).toBe(18);
    expect(pagedEmployees.items[3].id).toBe(19);
    expect(pagedEmployees.items[4].id).toBe(20);
    expect(pagedEmployees.pagination.page).toBe(3);
    expect(pagedEmployees.pagination.totalItems).toBe(30);
    expect(pagedEmployees.pagination.totalPages).toBe(6);
    expect(pagedEmployees.pagination.hasPrevious).toBe(true);
    expect(pagedEmployees.pagination.hasNext).toBe(true);

    done();
  });
});
