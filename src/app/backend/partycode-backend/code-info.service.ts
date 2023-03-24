import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CodeInfo } from "./code-info-model";

@Injectable({providedIn: 'root'})
export class CodeInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = '/';
  constructor(private http:HttpClient) {
    
  }

  getCodeInfo(partycode: string) {
    console.log(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="PartyCode"&equalTo="${partycode}"`);
    return this.http.get<CodeInfo>(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="PartyCode"&equalTo="${partycode}"`);
  }
  

  modifyCodeInfo(data:CodeInfo) {
   
    return this.http.post(this.baseUrl + this.myInfoEndpoint, data);
}

}