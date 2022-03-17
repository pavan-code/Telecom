import { PlanService } from 'src/app/services/plan.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobiles-list',
  templateUrl: './mobiles-list.component.html',
  styleUrls: ['./mobiles-list.component.scss'],
})
export class MobilesListComponent implements OnInit {
  constructor(
    private userService: UserService,
    private planService: PlanService
  ) {}
  panelOpenState = false;
  id: any = 0;
  user: any;
  mobiles: any;
  plans: any;

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.id = Number.parseInt(this.id, 10);
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data['data'];
      this.mobiles = this.user.mobiles;
      console.log(this.user);
      this.planService.getPlans().subscribe((data: any) => {
        this.plans = data.datae;
        this.setPlans();
      });
    });
  }

  setPlans() {
    this.mobiles.forEach((mobile: any) => {
      mobile.subscriptions.forEach((subscription: any) => {
        subscription.plan = this.plans.filter(
          (plan: any) => plan.id === subscription.planId
        )[0];
      });
    });
    console.log(this.mobiles);
    // this.getotp();
  }

  // getotp() {
  //   this.planService.getotp(this.mobiles[0].number).subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
}
