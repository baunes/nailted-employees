import { GetEmployees } from './getEmployees';
import { employeeRepository } from '../infra/repo';
import { CreatetEmployee } from './createEmployee';
import { FindEmployeeById } from './findEmployeeById';

export const getEmployees = new GetEmployees(employeeRepository);
export const createEmployee = new CreatetEmployee(employeeRepository);
export const findEmployeeById = new FindEmployeeById(employeeRepository);
