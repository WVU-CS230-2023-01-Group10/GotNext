import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserInfo } from "./user-info-model";

@Injectable({providedIn: 'root'})
export class UserInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Parties/FloatingUsers';
  constructor(private http:HttpClient) {
    
  }

}