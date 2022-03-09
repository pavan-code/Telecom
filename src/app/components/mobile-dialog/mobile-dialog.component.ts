import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-mobile-dialog',
  templateUrl: './mobile-dialog.component.html',
  styleUrls: ['./mobile-dialog.component.scss'],
})
export class MobileDialogComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MobileDialogComponent>,
  
  ) {
  
  }
  
 
  show: boolean = false;
  form!: FormGroup;
  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    
      this.form = this.fb.group({
        operator: ['', [Validators.required]],
        number: ['', [Validators.required]],
        band: ['', [Validators.required]],
        active: [true, [Validators.required]],
      });
    
  }
  addMobile() {
    this.show = true;
    setTimeout(() => {
      this.show = false;
      this.dialogRef.close(this.form.value);
    }, 1500);
  }
}
