import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartyInfo } from "./party-info-model";
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { query, ref, set } from 'firebase/database';


@Injectable({providedIn: 'root'})
export class PartyInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Party.json';
  constructor(private http:HttpClient, private db:AngularFireDatabase) {

  }

  // addPartyStuff(HostName: PartyInfo, PartyCode: PartyInfo, PartyName: PartyInfo) {
  //   var ref = this.db.list<PartyInfo>("Party/").query.ref;
  //   ref.child(HostName.Host).set(HostName);

  //   var ref2 = this.db.list<PartyInfo>("Party/").query.ref;
  //   ref2.child(PartyCode.PartyCode).set(PartyCode);

  //   var ref3 = this.db.list<PartyInfo>("Party/").query.ref;
  //   ref3.child(PartyName.Host).set(PartyName);
  // }

  addHost(HostName: PartyInfo) {
    var ref = this.db.list<PartyInfo>(" ").query.ref;
    ref.child(HostName.Host).set(HostName);
  }

  addPartyCode(PartyCode: PartyInfo) {
    var ref = this.db.list<PartyInfo>("Party/").query.ref;
    ref.child(PartyCode.PartyCode).set(PartyCode);
  }

  addPartyName(PartyName: PartyInfo) {
    var ref = this.db.list<PartyInfo>(" ").query.ref;
    ref.child(PartyName.Host).set(PartyName);
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