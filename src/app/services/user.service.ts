import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  addUserDetails(request: any) {
    return this.http.post<any>("http://localhost:3000/users", request)
  }
  getAllUserDetails() {
    return this.http.get<any>("http://localhost:3000/users");
  }
  putUserDetails(request: any, id:number) {
    return this.http.put<any>(`http://localhost:3000/users/${id}`,request);
  }
  deleteUserDetails(id:number) {
    return this.http.delete<any>(`http://localhost:3000/users/${id}`);
  }
}
