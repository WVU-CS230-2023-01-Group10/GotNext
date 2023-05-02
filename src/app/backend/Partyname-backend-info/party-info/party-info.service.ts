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

  /**
   * adds Party information under Party node in the database. 
   * @param Party contains party name, party code, and host name
   * 
   */
  addParty(Party: PartyInfo) {
    var ref = this.db.list<PartyInfo>("Party/").query.ref;
    ref.child(Party.PartyCode).set(Party);
  }
  
  /**
  * delete Party from databse
  * @param Party contains party name, party code, and host name
  */
  deleteParty(PartyCode: string) {
    var ref = this.db.list<PartyInfo>("Party/").query.ref;
    ref.child(PartyCode).remove();
  }
}