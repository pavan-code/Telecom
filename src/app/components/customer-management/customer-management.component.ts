import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CustomerManagementComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private userService: UserService,
    private dialog: MatDialog
  ) {}
  expandedElement: any;

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'aadhar',
    'address',
    'actions',
  ];
  dataSource = new MatTableDataSource<Number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  matSort!: MatSort;
  staffId: any;
  staff: any[] = [];

  ngOnInit(): void {
    this.staffId = localStorage.getItem('id');
    this.staffId = Number.parseInt(this.staffId);
    this.getCustomers();
    // console.log(this.staffId);
  }

  getCustomers() {
    this.userService
      .getCustomersByStaffId(this.staffId)
      .subscribe((data: any) => {
        setTimeout(() => {
          console.log(data);
          this.staff = data;
          this.dataSource = new MatTableDataSource(this.staff);
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
  editCustomer(cust: any) {}
  deleteCustomer(cust: any) {}
}
