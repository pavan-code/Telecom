import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.scss'],
})
export class RechargeComponent implements OnInit {
  constructor(private userService: UserService) {}

  id: any;
  userMobiles: any;
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.id = Number.parseInt(this.id);
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.userMobiles = data.data.mobiles;
      console.log(this.userMobiles);
    });
  }
}
