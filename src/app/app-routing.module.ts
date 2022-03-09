import { RechargeComponent } from './components/recharge/recharge.component';
import { MobilesListComponent } from './components/mobiles-list/mobiles-list.component';
import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { CustomerManagementComponent } from './components/customer-management/customer-management.component';
import { AuthGuard } from './guards/auth.guard';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { PlanManagementComponent } from './components/plan-management/plan-management.component';
import { MobileManagementComponent } from './components/mobile-management/mobile-management.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ManageStaffComponent } from './components/manage-staff/manage-staff.component';
import { StaffHomeComponent } from './components/staff-home/staff-home.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'mobile-management',
        component: MobileManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'plan-management',
        component: PlanManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-staff',
        component: AddStaffComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage-staff',
        component: ManageStaffComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'staff',
    component: AdminHomeComponent,
    children: [
      {
        path: 'customer-management',
        component: CustomerManagementComponent,
      },
      {
        path: 'add-customer',
        component: AddCustomerComponent,
      },
    ],
  },
  {
    path: 'customer',
    component: CustomerHomeComponent,
    children: [
      {
        path: 'profile',
        component: CustomerProfileComponent,
      },
      {
        path: 'mobiles',
        component: MobilesListComponent,
      },
      {
        path: 'recharge',
        component: RechargeComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
