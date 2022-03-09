import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileNumberService {

  constructor(private http: HttpClient) { }

  getMobileNumbers() {
    return this.http.get('http://localhost:8082/numbers');
  }
  addMobile(data: any) {
    return this.http.post('http://localhost:8082/number', data);
  }
}
