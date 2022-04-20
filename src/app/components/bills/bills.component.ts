import { PlanService } from './../../services/plan.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

interface MONTH {
  index: number;
  month: string;
}
const MONTHS: MONTH[] = [
  { index: 0, month: 'January' },
  { index: 1, month: 'February' },
  { index: 2, month: 'March' },
  { index: 3, month: 'April' },
  { index: 4, month: 'May' },
  { index: 5, month: 'June' },
  { index: 6, month: 'July' },
  { index: 7, month: 'August' },
  { index: 8, month: 'September' },
  { index: 9, month: 'October' },
  { index: 10, month: 'November' },
  { index: 11, month: 'December' },
];

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  constructor(
    private userService: UserService,
    private planService: PlanService
  ) {}

  cid: any;
  customer: any;
  months = MONTHS;
  year!: number;
  month!: string;
  subs: any[] = [];
  recps: any[] = [];
  show: boolean = false;
  plans: any[] = [];

  ngOnInit(): void {
    this.cid = localStorage.getItem('id');
    let subs: any[] = [];
    this.planService.getPlans().subscribe((plans: any) => {
      this.plans = plans.datae;
      this.userService.getUserById(this.cid).subscribe((data: any) => {
        this.customer = data.data;
        this.customer.mobiles.forEach((mobile: any) => {
          mobile.subscriptions.forEach((sub: any) => {
            this.plans.forEach((plan: any) => {
              if (sub.planId === plan.id) {
                sub.plan = plan;
              }
            });
            sub.mobile = mobile.number;
            subs.push(sub);
          });
        });
        // console.log(this.customer);

        this.recps = subs;
      });
    });
  }

  monthChanged(event: any) {
    this.subs = [];
    this.show = false;
    // console.log(event);
    this.month = event.value;
  }

  yearChanged(event: any) {
    this.subs = [];
    this.show = false;
    // console.log(event.target.value);
    // limit year to 4 digits
    this.year = event.target.value.slice(0, 4);
  }

  getReceipt() {
    console.log(this.recps);
    this.subs = [];
    console.log(this.month + this.year);
    this.recps.forEach((sub: any) => {
      if (
        this.months[sub.startDate[0] - 1].month === this.month &&
        sub.startDate.slice(-4) === this.year
      ) {
        this.subs.push(sub);
      }
    });
    console.log(this.subs);

    this.show = true;
  }
}
