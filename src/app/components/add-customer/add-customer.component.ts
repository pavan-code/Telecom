import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
})
export class AddCustomerComponent implements OnInit {
  constructor(private fb: FormBuilder, private userService: UserService) {}

  form!: FormGroup;
  numbers: any[] = [];
  filteredNumbers: any[] = [];
  staffId: any;

  ngOnInit(): void {
    this.staffId = localStorage.getItem('id');
    this.getNumbers();
    this.createform();
  }
  getNumbers() {
    this.userService.getNumbers().subscribe((data: any) => {
      // console.log(data);
      this.numbers = data.datae;
      console.log(this.numbers);
    });
  }
  operatorChanged(event: any) {
    console.log(event.value);
    this.filteredNumbers = this.numbers.filter((number) => {
      return number.operator === event.value;
    });
  }

  createform() {
    this.form = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      aadharNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(12),
          Validators.maxLength(12),
        ],
      ],
      password: ['password123', [Validators.required]],
      mobiles: this.fb.array([this.createMobile()], [Validators.required]),
      active: [true, [Validators.required]],
      address: this.fb.group({
        doorno: ['', [Validators.required]],
        street: ['', [Validators.required]],
        city: ['', [Validators.required]],
        district: ['', [Validators.required]],
        state: ['', [Validators.required]],
        pincode: ['', [Validators.required]],
      }),
    });
  }
  createMobile() {
    return this.fb.group({
      number: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      operator: ['', [Validators.required]],
      band: ['', [Validators.required]],
      active: [true, [Validators.required]],
      subscriptions: this.fb.array([]),
    });
  }
  createSubscription() {
    return this.fb.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
    });
  }
  mobiles(): FormArray {
    return this.form.get('mobiles') as FormArray;
  }

  subs(index: number): FormArray {
    return this.mobiles().at(index).get('subscriptions') as FormArray;
  }

  addMobile() {
    const control = <FormArray>this.form.controls['mobiles'];
    control.push(this.createMobile());
  }
  addSubs(i: number) {
    const control = <FormArray>this.subs(i);
    control.push(this.createSubscription());
  }
  removeMobile(i: number) {
    const control = <FormArray>this.form.controls['mobiles'];
    control.removeAt(i);
  }
  removeSub(i: number, j: number) {
    const control = <FormArray>this.subs(i);
    control.removeAt(j);
  }
  addCustomer() {
    const data = this.form.value;
    data['type'] = 'customer';
    data['staffId'] = this.staffId;
    console.log(data);
    this.userService.addStaff(data).subscribe((data: any) => {
      console.log(data);
    });
  }
}
