import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.component.html',
  styleUrls: ['./add-staff.component.scss'],
})
export class AddStaffComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbar: MatSnackBar
  ) {}

  form!: FormGroup;
  show: boolean = false;

  ngOnInit(): void {
    this.createform();
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

  openSnackbar(message: string, action: string, cls: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cls],
    });
  }

  addStaff() {
    this.show = true;
    console.log(this.form.value);
    const data = this.form.value;
    data['type'] = 'staff';
    this.userService.addStaff(data).subscribe((data: any) => {
      if (data) {
        this.show = false;
        console.log(data);
        this.ngOnInit();
        this.openSnackbar('Staff Added Successfully', '', 'success');
      } else {
        this.show = false;
        this.openSnackbar('Error in adding staff', '', 'error');
      }
    });
  }
}
