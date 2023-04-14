import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FloatingUserInfo } from "./floatinguser-info.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {query, ref, set} from 'firebase/database';
import { CodeInfo } from "../partycode-backend/code-info-model";
import { TeamInfo } from "../team-backend/team-info.model";

@Injectable({providedIn: 'root'})
export class FloatingUserInfoService {
  constructor(private http:HttpClient, private db:AngularFireDatabase) {
    
  }
  // var to update username in navbar
  FloatingUser: string='Username';

/**
 * adds user to chosen party under FloatingUser node within a specific party
 * @param FloatingUser user in a specific party who has not chosen a game
 */
addFloatingUser(partyCodeInfo: CodeInfo, floatingUserInfo: FloatingUserInfo) {
  const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/FloatingUsers`).query.ref;
  ref.child(floatingUserInfo.FloatingUser).set(floatingUserInfo);
}

/**
 * removes user from FloatingUser nodes
 * @param FloatingUser user in a specific party who has not chosen a game
 */
deleteFloatingUser(partyCodeInfo: CodeInfo, floatingUserInfo: TeamInfo) {
  const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/FloatingUsers`).query.ref;
  ref.child(floatingUserInfo.User1).remove();
  //ref.child(floatingUserInfo.User2).remove();
}



/**
 * adds user to a node containing all users 
 * @param FloatingUser 
 */
addAllUser(partyCodeInfo: CodeInfo, AllUsers: FloatingUserInfo) {
  const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/AllUsers`).query.ref;
  ref.child(AllUsers.FloatingUser).set(AllUsers);
}


}