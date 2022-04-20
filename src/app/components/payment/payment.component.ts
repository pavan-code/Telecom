import { UserService } from './../../services/user.service';
import { MsgdialogComponent } from './../msgdialog/msgdialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from './../../services/plan.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  plan: any;
  paymethod: string = '';
  cardnumber: string = '';
  cvv: string = '';
  expirydate: string = '';
  upi: string = '';
  cid: any;
  mid: any;
  pid: any;
  email: string = '';

  constructor(
    private planService: PlanService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cid = this.route.snapshot.params['cid'];
    this.mid = this.route.snapshot.params['mid'];
    this.pid = this.route.snapshot.params['pid'];
    this.userService.getUserById(this.cid).subscribe((data: any) => {
      console.log(data);

      this.email = data.data.email;
    });
    this.planService.getPlan(this.pid).subscribe((data: any) => {
      this.plan = data;
    });
  }

  method(event: any) {
    this.paymethod = event.value;
  }
  numChange(event: any) {
    let val = event.target.value;
    if (val.length === 4 || val.length === 9 || val.length === 14) {
      val = val + '-';
      console.log(val);
    }
    if (val.length >= 19) {
      val = val.slice(0, 19);
    }
    this.cardnumber = val;
  }
  cvvChange() {
    let val = this.cvv;
    if (val.length >= 3) {
      val = val.slice(0, 3);
    }
    this.cvv = val;
  }
  dateChange() {
    let val = this.expirydate;
    if (val.length === 2) {
      val = val + '/';
    }
    if (val.length >= 5) {
      val = val.slice(0, 5);
    }
    this.expirydate = val;
  }
  pay() {
    this.dialog
      .open(MsgdialogComponent, {
        width: '400px',
        height: 'auto',
        disableClose: true,
        data: {
          cid: this.cid,
          mid: this.mid,
          email: this.email,
          body: {
            planId: this.pid,
            paymentMethod: this.paymethod,
          },
        },
      })
      .afterClosed()
      .subscribe((data: any) => {
        // location.href = "/customer/mobiles"
        this.router.navigateByUrl('/customer/mobiles');
      });
  }
}
