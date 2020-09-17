interface EmployeeProps {
  id: number;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: Date;
}

export class Employee implements EmployeeProps {
  public constructor(
    public id: number,
    public name: string,
    public surname: string,
    public address: string,
    public phone: string,
    public email: string,
    public birthdate: Date,
  ) {}
}
