import { MatSnackBar } from '@angular/material/snack-bar';
import { MobileDialogComponent } from './../mobile-dialog/mobile-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MobileNumberService } from 'src/app/services/mobile-number.service';

class Number {
  id!: number;
  active!: boolean;
  band!: string;
  number!: string;
  operator!: string;
}

@Component({
  selector: 'app-mobile-management',
  templateUrl: './mobile-management.component.html',
  styleUrls: ['./mobile-management.component.scss'],
})
export class MobileManagementComponent implements OnInit {
  displayedColumns: string[] = ['id', 'number', 'operator', 'band', 'active'];
  dataSource = new MatTableDataSource<Number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  matSort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.matSort;
  }

  constructor(
    private mobileService: MobileNumberService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  mobileNumbers: Number[] = [];

  ngOnInit(): void {
    this.mobileNumbers = [];
    this.getMobileNumbers();
  }

  getMobileNumbers() {
    this.mobileService.getMobileNumbers().subscribe((data: any) => {
      setTimeout(() => {
        this.mobileNumbers = data.datae;
        this.dataSource = new MatTableDataSource(this.mobileNumbers);
        this.dataSource.sort = this.matSort;
        this.dataSource.paginator = this.paginator;
      }, 1500);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['success'],
    });
  }

  addMobile() {
    this.dialog
      .open(MobileDialogComponent, {
        width: '500px',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.mobileService.addMobile(data).subscribe((data: any) => {
            this.mobileNumbers = data.datae;
            this.openSnackBar('Mobile Number Added', 'OK');
            this.ngOnInit();
          });
        }
      });
  }
}
