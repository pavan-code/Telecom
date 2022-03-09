import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

class Request {
  email!: string;
  password!: string;
  type!: string;
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data: Request):Observable<any> {
    return this.http.post('http://localhost:8082/login', data);
  }
  isLoggedIn() {
    const actor = localStorage.getItem('actor');
    if(actor != null)
      return true;
    return false;
  }
}
