import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get('http://localhost:8082/plans');
  }
  getPlan(id: number) {
    return this.http.get(`http://localhost:8082/plan/${id}`);
  }
  addPlan(data: any) {
    return this.http.post('http://localhost:8082/plan', data);
  }

  deletePlan(id: number) {
    return this.http.delete(`http://localhost:8082/plan/${id}`);
  }
  getPlansByOperator(operator: string) {
    return this.http.get(`http://localhost:8082/plans/operator=${operator}`);
  }
  subscribe(cid: number, mid: number, data: any) {
    return this.http.post(
      `http://localhost:8082/customer/${cid}/mobile/${mid}/subscribe`,
      data
    );
  }
  getotp(email: string) {
    // email = 'pavankumaranguluri1@gmail.com';
    console.log(email);

    return this.http.get(`http://localhost:8082/generate-otp/${email}`);
  }
  validate(otp: string) {
    return this.http.get(`http://localhost:8082/validate-otp/${otp}`);
  }
}
