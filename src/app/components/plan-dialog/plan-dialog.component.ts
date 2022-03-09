import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-dialog',
  templateUrl: './plan-dialog.component.html',
  styleUrls: ['./plan-dialog.component.scss'],
})
export class PlanDialogComponent implements OnInit {
  plan: any;
  mode: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<PlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.plan = data.data;
    this.mode = data.mode;
  }
  show: boolean = false;
  form!: FormGroup;
  operation: string = "Add";
  action: string = "Adding"
  ngOnInit(): void {
    if(this.mode === 'edit') {
      this.operation = "Update";
      this.action = "Updating"
    }
    else {
      this.operation = "Add";
      this.action = "Adding"
    }
    this.createForm();
  }

  createForm() {
    if (this.mode === 'add') {
      this.form = this.fb.group({
        operator: ['', [Validators.required]],
        info: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        duration: ['', [Validators.required]],
      });
    } else {
      this.form = this.fb.group({
        id: [this.plan.id],
        operator: [this.plan.operator, {disabled: true}],
        info: [this.plan.info, [Validators.required]],
        amount: [this.plan.amount, [Validators.required]],
        duration: [this.plan.duration, [Validators.required]],
      });
    }
  }
  addPlan() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
      this.dialogRef.close(this.form.value);
    }, 1500);
  }
}
