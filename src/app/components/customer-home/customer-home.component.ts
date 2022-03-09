import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  scrWidth!: number;
  hide!: boolean;
  showFiller = false;

  constructor(private router: Router) {
    this.getScreenSize();
  }
  sidebar!: string;
  opened!: boolean;
  actor: any = '';
  username: any = '';
  ngOnInit(): void {
    this.actor = localStorage.getItem('actor');
    this.username = localStorage.getItem('name');
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    // this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrWidth);
    if (this.scrWidth <= 768) {
      this.sidebar = 'over';
      this.opened = false;
      this.hide = true;
    } else {
      this.sidebar = 'side';
      this.opened = true;
      this.hide = false;
    }
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
