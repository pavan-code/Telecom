import { PlanService } from './../../services/plan.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msgdialog',
  templateUrl: './msgdialog.component.html',
  styleUrls: ['./msgdialog.component.scss'],
})
export class MsgdialogComponent implements OnInit {
  paydetails: any;
  show: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planService: PlanService,
    private dialogRef: MatDialogRef<MsgdialogComponent>
  ) {
    this.paydetails = data;
  }
  otp: string = '';
  success: boolean = false;
  enteredOTP: string = '';

  ngOnInit(): void {
    this.planService.getotp(this.paydetails.email).subscribe((data: any) => {
      console.log(data);
      this.otp = data;
    });
  }
  otpChange(event: any) {
    console.log(event.target.value);
    this.enteredOTP = event.target.value;
  }
  submit() {
    this.show = false;
    this.success = false;
    this.planService.validate(this.enteredOTP).subscribe((data) => {
      if (data == true) {
        this.planService
          .subscribe(
            this.paydetails.cid,
            this.paydetails.mid,
            this.paydetails.body
          )
          .subscribe((data: any) => {
            console.log(data);
            if (data.Status == 'true') {
              setTimeout(() => {
                this.show = true;
                this.success = true;
                setTimeout(() => {
                  this.dialogRef.close();
                }, 1500);
              }, 1500);
            }
          });
      } else {
        alert('invalid otp');
        this.show = true;
        this.success = false;
      }
    });
  }
}
