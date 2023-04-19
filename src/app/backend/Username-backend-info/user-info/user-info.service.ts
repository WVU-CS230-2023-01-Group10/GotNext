import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInfo } from "./user-info-model";

@Injectable({providedIn: 'root'})
export class UserInfoService {
  constructor(private http:HttpClient) {
    
  }

  username: string ='';
  currentUser: string = 'urmumbruv';
}