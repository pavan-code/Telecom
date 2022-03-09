import { MatSnackBar } from '@angular/material/snack-bar';
import { PlanDialogComponent } from './../plan-dialog/plan-dialog.component';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PlanService } from 'src/app/services/plan.service';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
class Plan {
  id!: number;
  operator!: string;
  info!: string;
  amount!: number;
  duration!: number;
}

@Component({
  selector: 'app-plan-management',
  templateUrl: './plan-management.component.html',
  styleUrls: ['./plan-management.component.scss'],
})
export class PlanManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'operator',
    'info',
    'amount',
    'duration',
    'actions',
  ];
  dataSource = new MatTableDataSource<Plan>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort)
  matSort!: MatSort;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.plans);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.matSort;
  }

  constructor(
    private plansService: PlanService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {}

  plans: Plan[] = [];

  ngOnInit(): void {
    this.plans = [];
    this.getPlans();
  }

  getPlans() {
    this.plansService.getPlans().subscribe((data: any) => {
      setTimeout(() => {
        this.plans = data.datae;
        this.dataSource = new MatTableDataSource(this.plans);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.matSort;
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
  deletePlan(id: number) {
    this.plansService.deletePlan(id).subscribe((data: any) => {
      this.plans = data.datae;
      this.openSnackBar(data.message, 'OK');
      this.ngOnInit();
    });
  }

  editPlan(plan: Plan) {
    console.log(plan);

    const dialogRef = this.dialog
      .open(PlanDialogComponent, {
        width: '500px',
        disableClose: true,
        data: {
          data: plan,
          mode: 'edit',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          console.log(data);

          this.plansService.addPlan(data).subscribe((data: any) => {
            this.plans = data.datae;
            this.openSnackBar('Plan updated successfully', 'OK');
            this.ngOnInit();
          });
        }
      });
  }

  addPlan() {
    this.dialog
      .open(PlanDialogComponent, {
        width: '500px',
        disableClose: true,
        data: {
          mode: 'add',
        },
      })
      .afterClosed()
      .subscribe((data) => {
        if (data) {
          this.plansService.addPlan(data).subscribe((data: any) => {
            console.log(data.datae);
            this.plans = data.datae;
            this.openSnackBar('Plan added successfully', 'OK');
            this.ngOnInit();
          });
        }
      });
  }
}
