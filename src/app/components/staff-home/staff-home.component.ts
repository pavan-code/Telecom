import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-home',
  templateUrl: './staff-home.component.html',
  styleUrls: ['./staff-home.component.scss']
})
export class StaffHomeComponent implements OnInit {

  scrWidth!: number;
  hide!: boolean;
  showFiller = false;

  constructor(@Inject(DOCUMENT) private document: Document,
              private router: Router) {
    this.getScreenSize();
  }
  sidebar!: string;
  opened!: boolean;
  actor: any = ""
  ngOnInit(): void {
    this.actor = localStorage.getItem('actor');
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
