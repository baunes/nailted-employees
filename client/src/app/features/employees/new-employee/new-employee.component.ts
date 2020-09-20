import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employees.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  createEmployeeForm: FormGroup;

  constructor(
    public service: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    this.createEmployeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      birthdate: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(customerData): void {
    const employee = {
      ...customerData,
      birthdate: new Date(customerData.birthdate),
    };

    console.log('To Create', customerData, employee);
    this.service.createEmployee(employee).subscribe((created) => {
      console.log('Created', created);
      this.createEmployeeForm.reset();
    });
  }

  getCssValidationClass(field: string): any {
    return {
      'is-invalid':
        this.createEmployeeForm.controls[field].invalid &&
        this.createEmployeeForm.controls[field].touched,
      'is-valid': this.createEmployeeForm.controls[field].valid,
      '': this.createEmployeeForm.controls[field].untouched,
    };
  }
}
