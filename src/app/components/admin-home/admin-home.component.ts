import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  scrWidth!: number;
  hide!: boolean;
  showFiller = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.getScreenSize();
  }
  isDarkMode: boolean = false;
  url: string = '';
  sidebar!: string;
  opened!: boolean;
  actor: any = '';
  username: any = '';
  ngOnInit(): void {
    this.actor = localStorage.getItem('actor');
    this.username = localStorage.getItem('name');
    this.url = this.route.snapshot.url[0].path;
    console.log(this.route.snapshot.url);
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
