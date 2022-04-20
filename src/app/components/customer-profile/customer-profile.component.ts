import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './customer-profile.component.html',
  styleUrls: ['./customer-profile.component.scss'],
})
export class CustomerProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar
  ) {}

  profile: any;
  cid: any;
  show: boolean = true;
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.cid = localStorage.getItem('id');
    this.cid = Number.parseInt(this.cid);
    this.userService.getUserById(this.cid).subscribe((data: any) => {
      console.log(data);
      this.profile = data['data'];
      this.show = false;
    });
    this.createForm();
  }

  createForm() {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }
  openSnackBar(message: string, action: string, cls: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cls],
    });
  }
  changePassword() {
    const oldPassword = this.changePasswordForm.get(
      'oldPassword'
    ) as FormControl;
    const newPassword = this.changePasswordForm.get(
      'newPassword'
    ) as FormControl;
    const confirmPassword = this.changePasswordForm.get(
      'confirmPassword'
    ) as FormControl;

    if (oldPassword.value != this.profile.password) {
      this.openSnackBar('Old Password is incorrect', '', 'error');
    } else {
      if (newPassword.value == confirmPassword.value) {
        this.userService
          .changePassword(this.cid, newPassword.value)
          .subscribe((data: any) => {
            this.openSnackBar(data.message + '.\nLogin Again!', '', 'success');
            localStorage.clear();
            location.href = '/login';
          });
      } else {
        this.openSnackBar(
          'New Password and Confirm Password does not match',
          '',
          'error'
        );
      }
    }
  }
}
