import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartyInfo } from "./party-info-model";

@Injectable({providedIn: 'root'})
export class PartyInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Party.json';
  constructor(private http:HttpClient) {
    
  }

  getPartyInfo(partyname: string) {
    console.log(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="Partyname"&equalTo="${partyname}"`);
    return this.http.get<PartyInfo>(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="Partyname"&equalTo="${partyname}"`);
  }
  

  modifyPartyInfo(partyname: string, host: string, partycode: string) {
    const data: PartyInfo = {
      PartyName: partyname,
      Host: host,
      PartyCode: partycode
    };
    return this.http.post(`${this.baseUrl}${this.myInfoEndpoint}`, data);
  }
  

}