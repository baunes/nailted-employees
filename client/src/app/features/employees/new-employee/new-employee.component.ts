import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeService } from '../employees.service';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss'],
})
export class NewEmployeeComponent implements OnInit {
  createEmployeeForm: FormGroup;

  constructor(
    private service: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router
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
      this.viewEmployee(created.id);
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

  private viewEmployee(id: number): void {
    this.router.navigate([`/employees/${id}`]);
  }
}
