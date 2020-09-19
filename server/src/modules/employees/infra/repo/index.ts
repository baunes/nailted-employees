import { EmployeeRepositoryFile } from './employeeRepositoryFile';

const employeesFile = `${process.cwd()}/${process.env.REPOSITORY_FILE_PATH}`;
export const employeeRepository = new EmployeeRepositoryFile(employeesFile);
