import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobiles-list',
  templateUrl: './mobiles-list.component.html',
  styleUrls: ['./mobiles-list.component.scss'],
})
export class MobilesListComponent implements OnInit {
  constructor(private userService: UserService) {}
  panelOpenState = false;
  id: any = 0;
  user: any;
  mobiles: any;
  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.id = Number.parseInt(this.id, 10);
    this.userService.getUserById(this.id).subscribe((data: any) => {
      this.user = data['data'];
      this.mobiles = this.user.mobiles;
    });
  }
}
