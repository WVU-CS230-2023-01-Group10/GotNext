import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PartyInfo } from "./party-info-model";
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { query, ref, set } from 'firebase/database';
import { CodeInfo } from "../../partycode-backend/code-info-model";
import { Observable } from "rxjs";


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

  /**
   * check if party has been terminated
   * @param partyCodeInfo 
   * @returns false if party no longer exists
   */
  async checkIfPartyTerminated(partyCodeInfo: CodeInfo): Promise<boolean> {
    const ref = this.db.list<CodeInfo>(`Party/${partyCodeInfo.Partycode}`).query.ref;
    const snapshot = await ref.child(partyCodeInfo.Partycode).once('value');
    return snapshot.exists();
  }

  getParties(partyCode: string): Observable<PartyInfo[]> {
    return this.db.list<PartyInfo>(`Party/${partyCode}`).valueChanges();
  }

}