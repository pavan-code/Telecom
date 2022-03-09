import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getPlans() {
    return this.http.get('http://localhost:8082/plans');
  }

  addPlan(data: any) {
    return this.http.post('http://localhost:8082/plan', data);
  }

  deletePlan(id: number) {
    return this.http.delete(`http://localhost:8082/plan/${id}`);
  }
}
