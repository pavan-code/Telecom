import { UserService } from './../../services/user.service';
import { PlanService } from 'src/app/services/plan.service';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  show: boolean = false;
  message: any;
  id: any;
  name: any;
  actor: any;
  email: string = '';
  showotp: boolean = false;
  isForget: boolean = false;
  validOTP: boolean = false;
  showmail: boolean = false;
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private loginService: LoginService,
    private planService: PlanService,
    private userService: UserService
  ) {}

  enteredOTP: string = '';
  newPass: string = '';
  newPass1: string = '';

  ngOnInit(): void {
    this.show = false;
    this.showotp = false;
    this.createForm();
  }
  formErrors: Object = {
    username: '',
    password: '',
  };
  validationMsgs: Object = {
    username: {
      required: 'Enter an username',
    },
    password: {
      required: 'Enter the password',
    },
  };

  openSnackBar(message: string, action: string, cls: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [cls],
    });
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  login() {
    this.show = true;
    this.loginService.login(this.loginForm.value).subscribe(
      (data) => {
        console.log(data);
        setTimeout(() => {
          if (data.statusCode === 200) {
            this.showotp = true;
            this.message = data.message;
            this.id = data.user.id;
            this.name = data.user.name;
            this.actor = data.user.type;
            this.planService
              .getotp(this.loginForm.value.email)
              .subscribe((data: any) => {
                console.log(data);
              });
          } else {
            this.show = false;
            this.showotp = false;
            this.openSnackBar(data.message, '', 'error');
          }
        }, 1500);
        console.log(data);
      },
      (err) => {
        setTimeout(() => {
          this.show = false;
          this.openSnackBar(
            'Unexpected error occured. Login again',
            '',
            'error'
          );
        }, 1500);
        console.log(err);
      }
    );
  }
  otpChange(event: any) {
    this.enteredOTP = event.target.value;
    console.log(this.enteredOTP);
  }

  submit() {
    this.planService.validate(this.enteredOTP).subscribe((data) => {
      if (data === true) {
        this.openSnackBar(this.message, '', 'success');
        localStorage.setItem('id', this.id);
        localStorage.setItem('name', this.name);
        localStorage.setItem('actor', this.actor);
        location.href = '/' + this.actor;
      } else {
        this.openSnackBar('Invalid OTP', '', 'error');
      }
    });
  }

  validate() {
    this.planService.validate(this.enteredOTP).subscribe((data) => {
      if (data === true) {
        this.validOTP = true;
      } else {
        this.openSnackBar('Invalid OTP', '', 'error');
      }
    });
  }

  forget(event: any) {
    this.isForget = true;
    event?.preventDefault();
    this.showmail = true;
  }

  changePassword() {
    if (this.newPass !== '' && this.newPass1 !== '') {
      if (this.newPass.trim() === this.newPass1.trim()) {
        this.userService.getUserByEmail(this.email).subscribe((data: any) => {
          console.log(data);
          this.userService
            .changePassword(data.id, this.newPass)
            .subscribe((data: any) => {
              console.log(data);
              this.openSnackBar(data.message, '', 'success');
              this.isForget = false;
              this.showmail = false;
              this.newPass = '';
              this.newPass1 = '';
              this.email = '';
            });
        });
      } else {
        this.openSnackBar('Password not matched', '', 'error');
      }
    } else {
      this.openSnackBar('Password should not be empty', 'close', 'error');
    }
  }

  requestOTP() {
    console.log(this.email);

    this.planService.getotp(this.email).subscribe((data: any) => {
      console.log(data);
      if (data.status == true) {
        this.openSnackBar('OTP sent to your mail', '', 'success');
        this.showmail = false;
      } else {
        this.openSnackBar(data.message, '', 'error');
      }
    });
  }
}
