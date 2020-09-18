import { Employee } from '../domain/employee';
import { ParseUtils } from '../../../utils/parseUtils';

export class EmployeeMapper {
  /**
   * Maps an arary of string to an Empoyee Domain Object.
   * @param row Array of fileds to transform
   * @returns The Employee or undefined if is not possible.
   * @throws Throws an error when is not a valid Employee
   */
  public static toDomain(row: string[]): Employee {
    if (row.length != 7) {
      throw new Error('Invalid data. Must be an array of length 7.');
    }
    return new Employee(Number.parseInt(row[0]), row[1], row[2], row[3], row[4], row[5], ParseUtils.parseDate(row[6]));
  }
}
