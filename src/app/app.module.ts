import { PlanDialogComponent } from './components/plan-dialog/plan-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
// material imports
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// components
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MobileManagementComponent } from './components/mobile-management/mobile-management.component';
import { PlanManagementComponent } from './components/plan-management/plan-management.component';
import { MobileDialogComponent } from './components/mobile-dialog/mobile-dialog.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { MobilesListComponent } from './components/mobiles-list/mobiles-list.component';
import { RechargeComponent } from './components/recharge/recharge.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    AdminHomeComponent,
    MobileManagementComponent,
    PlanManagementComponent,
    PlanDialogComponent,
    MobileDialogComponent,
    AddStaffComponent,
    ManageStaffComponent,
    CustomerManagementComponent,
    StaffHomeComponent,
    AddCustomerComponent,
    CustomerHomeComponent,
    CustomerProfileComponent,
    MobilesListComponent,
    RechargeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSortModule,
    MatListModule,
    MatRadioModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
