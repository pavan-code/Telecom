import { UserService } from './../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.scss'],
})
export class ManageStaffComponent implements OnInit {
  constructor(
    private snackbar: MatSnackBar,
    private userService: UserService,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'aadhar',
    'address',
    'mobile',
    'actions',
  ];
  dataSource = new MatTableDataSource<Number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort)
  matSort!: MatSort;

  staff: any[] = [];
  show: boolean = true;

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff() {
    this.userService.getStaff().subscribe((data: any) => {
      setTimeout(() => {
        console.log(data);
        this.staff = data.datae;
        console.log(this.staff);
        this.dataSource = new MatTableDataSource(this.staff);
        this.dataSource.sort = this.matSort;
        this.dataSource.paginator = this.paginator;
        this.show = false;
      }, 1500);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openSnackBar(message: string, action: string, cls: string) {
    this.snackbar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [cls],
    });
  }

  deleteStaff(staff: any) {
    this.userService.deleteStaff(staff.id).subscribe((data: any) => {
      console.log(data.StatusCode);
      if (data.StatusCode == '200')
        this.openSnackBar('Staff member deleted ', '', 'success');
      else this.openSnackBar('Error in deleting staff member', '', 'error');
      this.ngOnInit();
    });
  }
}
