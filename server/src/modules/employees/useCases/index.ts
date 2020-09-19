import { GetEmployees } from './getEmployees';
import { employeeRepository } from '../infra/repo';
import { CreatetEmployee } from './createEmployee';

export const getEmployees = new GetEmployees(employeeRepository);
export const createEmployee = new CreatetEmployee(employeeRepository);
