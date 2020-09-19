import { GetEmployees } from './getEmployees';
import { employeeRepository } from '../infra/repo';

export const getEmployees = new GetEmployees(employeeRepository);
