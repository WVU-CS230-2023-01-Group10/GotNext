import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FloatingUserInfo } from "./floatinguser-info.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {query, ref, set} from 'firebase/database';

@Injectable({providedIn: 'root'})
export class FloatingUserInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = 'Party/FloatingUsers.json';
  constructor(private http:HttpClient, private db:AngularFireDatabase) {
    
  }

/**
 * adds user to chosen party under FloatingUser node
 * @param FloatingUser user in a specific party who has not chosen a game
 */
addFloatingUser(FloatingUser: FloatingUserInfo) {
  var ref = this.db.list<FloatingUserInfo>("Party/FloatingUsers/").query.ref;
  ref.child(FloatingUser.FloatingUser).set(FloatingUser);
}

}