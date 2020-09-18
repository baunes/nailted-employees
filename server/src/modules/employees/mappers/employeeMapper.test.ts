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
});
