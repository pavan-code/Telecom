import { PlanService } from './../../services/plan.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msgdialog',
  templateUrl: './msgdialog.component.html',
  styleUrls: ['./msgdialog.component.scss'],
})
export class MsgdialogComponent implements OnInit {
  paydetails: any;
  show: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planService: PlanService,
    private dialogRef: MatDialogRef<MsgdialogComponent>
  ) {
    this.paydetails = data;
  }

  ngOnInit(): void {
    this.planService
      .subscribe(this.paydetails.cid, this.paydetails.mid, this.paydetails.body)
      .subscribe((data: any) => {
        console.log(data);
        if (data.Status == 'true') {
          setTimeout(() => {
            this.show = false;
            setTimeout(() => {
              this.dialogRef.close();
            }, 1500);
          }, 1500);
        }
      });
  }
}
