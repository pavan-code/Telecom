import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getStaff() {
    return this.http.get('http://localhost:8082/staff');
  }
  addStaff(staff: any) {
    return this.http.post('http://localhost:8082/registerStaff', staff);
  }
  deleteStaff(id: any) {
    return this.http.delete(`http://localhost:8082/staff/${id}`);
  }
  getCustomersByStaffId(id: number) {
    // console.log(id);
    return this.http.get('http://localhost:8082/customer/staff/' + id);
  }
  addCustomer(customer: any) {
    return this.http.post('http://localhost:8082/registerCustomer', customer);
  }
  getNumbers() {
    return this.http.get('http://localhost:8082/numbers');
  }
  getUserById(id: number) {
    return this.http.get('http://localhost:8082/customer/' + id);
  }
  changePassword(id: number, password: string) {
    return this.http.put(
      `http://localhost:8082/customer/${id}/${password}`,
      {}
    );
  }
}
