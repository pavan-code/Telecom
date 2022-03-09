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
  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.show = false;
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
          this.show = false;
          if (data.statusCode === 200) {
            this.openSnackBar(data.message, '', 'success');
            localStorage.setItem('id', data.user.id);
            localStorage.setItem('name', data.user.name);
            localStorage.setItem('actor', data.user.type);
            location.href = '/' + data.user.type;
          } else this.openSnackBar(data.message, '', 'error');
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
}
