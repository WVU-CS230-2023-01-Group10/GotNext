import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FloatingUserInfo } from "./floatinguser-info.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {query, ref, set} from 'firebase/database';
import { CodeInfo } from "../partycode-backend/code-info-model";

@Injectable({providedIn: 'root'})
export class FloatingUserInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Party/FloatingUsers.json';
  constructor(private http:HttpClient, private db:AngularFireDatabase) {
    
  }

/**
 * adds user to chosen party under FloatingUser node within a specific party
 * @param FloatingUser user in a specific party who has not chosen a game
 */
addFloatingUser(partyCodeInfo: CodeInfo, floatingUserInfo: FloatingUserInfo) {
  const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/FloatingUsers`).query.ref;
  ref.child(floatingUserInfo.FloatingUser).set(floatingUserInfo);
}


/**
 * adds user to a node containing all users 
 * @param FloatingUser 
 */
addAllUser(AllUsers: FloatingUserInfo) {
  var ref = this.db.list<FloatingUserInfo>("Party/AllUsers/").query.ref;
  ref.child(AllUsers.FloatingUser).set(AllUsers);
}

}