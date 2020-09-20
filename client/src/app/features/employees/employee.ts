import { PaggedDto } from 'src/app/core/paggedDto';

export interface Employee {
  id?: number;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: Date;
}

export type PaggedEmployee = PaggedDto<Employee>;
