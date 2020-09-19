import { Employee } from '../domain/employee';
import { EmployeeMapper } from './employeeMapper';

describe('EmployeeMapper', () => {
  test('maps throws an Error when covnerting an empty Array to Domain', () => {
    expect(() => {
      EmployeeMapper.toDomain([]);
    }).toThrowError();
  });

  test('maps correctly from string to Domain', () => {
    const employee = EmployeeMapper.toDomain([
      '1',
      'Della',
      'Cox',
      '4945 Lucky Duck Drive',
      '412-862-8457',
      'DellaDCox@superrito.com',
      '10/12/1985',
    ]);

    expect(employee.id).toBe(1);
    expect(employee.surname).toBe('Cox');
    expect(employee.name).toBe('Della');
    expect(employee.address).toBe('4945 Lucky Duck Drive');
    expect(employee.phone).toBe('412-862-8457');
    expect(employee.email).toBe('DellaDCox@superrito.com');
    expect(employee.birthdate.getUTCDate()).toBe(12);
    expect(employee.birthdate.getUTCMonth() + 1).toBe(10);
    expect(employee.birthdate.getUTCFullYear()).toBe(1985);
  });

  test('maps correctly from Domain to Csv', () => {
    const employee = new Employee(
      1,
      'Cox',
      'Della',
      '4945 Lucky Duck Drive',
      '412-862-8457',
      'DellaDCox@superrito.com',
      new Date('1985-10-12'),
    );
    const row = EmployeeMapper.toStringRow(employee);

    expect(row[0]).toBe('1');
    expect(row[1]).toBe('Cox');
    expect(row[2]).toBe('Della');
    expect(row[3]).toBe('4945 Lucky Duck Drive');
    expect(row[4]).toBe('412-862-8457');
    expect(row[5]).toBe('DellaDCox@superrito.com');
    expect(row[6]).toBe('10/12/1985');
  });
});
