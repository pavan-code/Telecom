import { PaymentComponent } from './../payment/payment.component';
import { MatDialog } from '@angular/material/dialog';
import { PlanService } from './../../services/plan.service';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {
  constructor(
    private userService: UserService,
    private planService: PlanService,
    private dialog: MatDialog
  ) {}

  id: any;
  userMobiles: any;
  operator: string = '';
  state: string = '';
  numberSelected: boolean = false;
  plans: any;
  mid: any;

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.id = Number.parseInt(this.id);
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.userMobiles = data.data.mobiles;
      this.state = data.data.address.state;
      console.log(this.userMobiles);
    });
  }

  mobileChange(event: any) {
    this.userMobiles.filter((mobile: any) => {
      if (mobile.number === event.value) {
        this.operator = mobile.operator;
        this.mid = mobile.id;
        this.numberSelected = true;
        this.planService
          .getPlansByOperator(this.operator)
          .subscribe((data: any) => {
            setTimeout(() => {
              this.plans = data;
              console.log(this.plans);
            }, 1500);
          });
      }
    });
  }
}
