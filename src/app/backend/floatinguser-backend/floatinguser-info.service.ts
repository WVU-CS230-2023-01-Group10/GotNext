import { Injectable } from "@angular/core";
import { FloatingUserInfo } from "./floatinguser-info.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { CodeInfo } from "../partycode-backend/code-info-model";
import { TeamInfo } from "../team-backend/team-info.model";

/**
 * Typescript file to handle events, floating user services, and to manipulate data in the realtime database
 * @file floatinguser-info.service.ts
 * @author Nathan Mullins
 * @date Mar 3, 2023
 */

@Injectable({providedIn: 'root'})
export class FloatingUserInfoService {
  // define and initialize for username of floating user, floating users belong to a party but have not yet chosen a game
  FloatingUser: string='Username';

  /**
   * constructor for the FlaotingUserInfoService
   * defines the Angular Fire Databse
   */
  constructor(private db:AngularFireDatabase) {}

  /**
   * adds user to chosen party under FloatingUser node in Realtime database
   * @param partyCodeInfo party code for specified party
   * @param floatingUserInfo username of floating user 
   */
  addFloatingUser(partyCodeInfo: CodeInfo, floatingUserInfo: FloatingUserInfo) {
    const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/FloatingUsers`).query.ref;
    ref.child(floatingUserInfo.FloatingUser).set(floatingUserInfo);
  }

  /**
   * removes user from FloatingUser node in Realtime database
   * @param partyCodeInfo party code for specified party
   * @param floatingUserInfo username of floating user
   */
  deleteFloatingUser(partyCodeInfo: CodeInfo, floatingUserInfo: TeamInfo) {
    const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/FloatingUsers`).query.ref;
    ref.child(floatingUserInfo.User1).remove();
  }



  /**
   * adds user to a node containing all users within a party in Realtime database
   * @param partyCodeInfo party code for specified party
   * @param AllUsers contains username of a user within a specified party
   */
  addAllUser(partyCodeInfo: CodeInfo, AllUsers: FloatingUserInfo) {
    const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/AllUsers`).query.ref;
    ref.child(AllUsers.FloatingUser).set(AllUsers);
  }

  /**
   * removes user from a node containing all users within a party in Realtime database
   * @param partyCodeInfo party code for specified party
   * @param AllUsers contains username of a user within a specified party
   */
  deleteAllUser(partyCodeInfo: CodeInfo, floatingUserInfo: string) {
    const ref = this.db.list<FloatingUserInfo>(`Party/${partyCodeInfo.Partycode}/AllUsers`).query.ref;
    ref.child(floatingUserInfo).remove();
  }

}