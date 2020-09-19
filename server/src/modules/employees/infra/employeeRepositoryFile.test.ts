import * as fs from 'fs';
import * as os from 'os';
import * as util from 'util';
import { Pagination } from '../../../core/pagination';
import { Employee } from '../domain/employee';
import { Filter } from '../domain/repository';
import { EmployeeRepositoryFile } from './employeeRepositoryFile';

const copyFile = util.promisify(fs.copyFile);
const unlink = util.promisify(fs.unlink);

const employeesFile = `${process.cwd()}/test-assets/employees.txt`;

async function copyRepositoryFile(): Promise<string> {
  const tmpFile = `${os.tmpdir()}/employees-${new Date().valueOf()}.txt`;
  await copyFile(employeesFile, tmpFile);
  return tmpFile;
}

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

  test('filters by email', async (done) => {
    const filter: Filter = (e) => e.email.includes('@superrito.com');
    const pagedEmployees = await repository.getAllEmployees(Pagination.none(), { filter });

    expect(pagedEmployees.items).toHaveLength(5);
    expect(pagedEmployees.pagination.page).toBe(0);
    expect(pagedEmployees.pagination.totalItems).toBe(5);
    expect(pagedEmployees.pagination.totalPages).toBe(1);
    expect(pagedEmployees.pagination.hasPrevious).toBe(false);
    expect(pagedEmployees.pagination.hasNext).toBe(false);

    done();
  });

  test('retrieves sorted by name and surname', async (done) => {
    const sorter = (e1: Employee, e2: Employee) => {
      const byName = e1.name.localeCompare(e2.name);
      if (byName === 0) {
        return e1.surname.localeCompare(e2.surname);
      } else {
        return byName;
      }
    };
    const pagedEmployees = await repository.getAllEmployees(Pagination.none(), { sorter });

    expect(pagedEmployees.items).toHaveLength(30);
    expect(pagedEmployees.pagination.page).toBe(0);
    expect(pagedEmployees.pagination.totalItems).toBe(30);
    expect(pagedEmployees.pagination.totalPages).toBe(1);
    expect(pagedEmployees.pagination.hasPrevious).toBe(false);
    expect(pagedEmployees.pagination.hasNext).toBe(false);

    expect(pagedEmployees.items[0].id).toBe(15);
    expect(pagedEmployees.items[29].id).toBe(2);

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

  test('persist an employee', async (done) => {
    const tmpFile = await copyRepositoryFile();
    const tmpRepository = new EmployeeRepositoryFile(tmpFile);

    const lengthBeforeCreation = await (await tmpRepository.getAllEmployees(Pagination.none())).items.length;

    const employee = new Employee(
      31,
      'Cox',
      'Della',
      '4945 Lucky Duck Drive',
      '412-862-8457',
      'DellaDCox@superrito.com',
      new Date('1985-10-12'),
    );

    await tmpRepository.createEmployee(employee);

    const lengthAfterCreation = await (await tmpRepository.getAllEmployees(Pagination.none())).items.length;
    unlink(tmpFile);

    expect(lengthAfterCreation).toBe(lengthBeforeCreation + 1);

    done();
  });

  test('finds an employee', async (done) => {
    const employee = await repository.findEmployeeById(21);

    expect(employee).not.toBeUndefined();

    if (employee !== undefined) {
      expect(employee.id).toBe(21);
      expect(employee.name).toBe('Marco');
      expect(employee.surname).toBe('Dube');
      expect(employee.address).toBe('1779 Atha Drive');
      expect(employee.phone).toBe('661-695-3020');
      expect(employee.email).toBe('MarcoPDube@rhyta.com');
      expect(employee.birthdate.getUTCDate()).toBe(25);
      expect(employee.birthdate.getUTCMonth() + 1).toBe(7);
      expect(employee.birthdate.getUTCFullYear()).toBe(1939);
    }

    done();
  });

  test("returns undefined an id does't exists", async (done) => {
    const employee = await repository.findEmployeeById(100000);

    expect(employee).toBeUndefined();

    done();
  });
});
