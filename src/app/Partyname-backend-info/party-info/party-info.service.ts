import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartyInfo } from "./party-info-model";

@Injectable({providedIn: 'root'})
export class PartyInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Party-info.json';
  constructor(private http:HttpClient) {
    
  }

  getPartyInfo() {
    console.log(this.baseUrl + this.myInfoEndpoint);
    return this.http.get<PartyInfo>(this.baseUrl + this.myInfoEndpoint);
  }

  modifyPartyInfo(data:PartyInfo) {
   
    return this.http.put(this.baseUrl + this.myInfoEndpoint, data);
}

}