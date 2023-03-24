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

  getFloatingUserInfo(floatinguser: string) {
    console.log(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="FloatingUser"&equalTo="${floatinguser}"`);
    return this.http.get<FloatingUserInfo>(`${this.baseUrl}${this.myInfoEndpoint}?orderBy="FloatingUser"&equalTo="${floatinguser}"`);
  }
  
// sends data to backend
  modifyFloatingUserInfo(data:FloatingUserInfo) {
   
    return this.http.post(this.baseUrl + this.myInfoEndpoint, data);
}

// try and send data to backend using firebase
addFloatingUser(FloatingUser: FloatingUserInfo) {
  var ref = this.db.list<FloatingUserInfo>("Party/FloatingUsers/").query.ref;
  ref.child(FloatingUser.FloatingUser).set(FloatingUser);
}

}