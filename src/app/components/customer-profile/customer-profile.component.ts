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
  constructor(private userService: UserService, private fb: FormBuilder) {}

  profile: any;
  cid: any;
  changePasswordForm!: FormGroup;

  ngOnInit(): void {
    this.cid = localStorage.getItem('id');
    this.cid = Number.parseInt(this.cid);
    this.userService.getUserById(this.cid).subscribe((data: any) => {
      console.log(data);
      this.profile = data['data'];
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
      alert('Old password is incorrect');
    } else {
      if (newPassword.value == confirmPassword.value) {
        this.userService
          .changePassword(this.cid, newPassword.value)
          .subscribe((data: any) => {
            alert('Password changed successfully');
          });
      } else {
        alert('New password and confirm password do not match');
      }
    }
  }
}
