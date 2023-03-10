import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInfo } from "./user-info-model";

@Injectable({providedIn: 'root'})
export class UserInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'User-info.json';
  constructor(private http:HttpClient) {
    
  }

  getUserInfo(username: string) {
    console.log(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="username"&equalTo="${username}"`);
    return this.http.get<UserInfo>(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="username"&equalTo="${username}"`);
  }
  

  modifyUserInfo(data:UserInfo) {
   
    return this.http.post(this.baseUrl + this.myInfoEndpoint, data);
}

}