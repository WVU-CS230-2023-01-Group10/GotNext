import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../backend/auth/AuthResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { getAuth, onAuthStateChanged, signInAnonymously, deleteUser } from "firebase/auth";
import { User } from '@firebase/auth-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://identitytoolkit.googleapis.com/v1/accounts';
  anonymousEndpoint: string = 'signUp';

  constructor(private http: HttpClient) { }

  /**
   * Signs in users anonymously
   * @returns Observable<AuthResponse> auth response
   */
  signInAnonymously() : Observable<AuthResponse> {
    // request body: returns token
    const requestBody = {
      "returnSecureToken": true
    };

    // makes HTTP request with anonymous endpoint sending request body
    return this.http.post<AuthResponse>(this.baseUrl + ':' + this.anonymousEndpoint + '?' + 
      'key=' + environment.firebase.apiKey, requestBody);
  }

  currentUser() {
    var auth = getAuth();

    return auth.currentUser;
  }

  async testNewAnonSignIn() : Promise<Observable<AuthResponse>>{
    var auth = getAuth();
    if (await auth.currentUser == null) {
      signInAnonymously(auth).then(() => {
        return auth.currentUser;
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;

        console.log("There was an error: ");
        console.log(errorCode);
      })
    }


    const requestBody = {
      "returnSecureToken": true
    };

    // makes HTTP request with anonymous endpoint sending request body
    return this.http.post<AuthResponse>(this.baseUrl + ':' + this.anonymousEndpoint + '?' + 
      'key=' + environment.firebase.apiKey, requestBody);
  }

  signUserOut() {
    var auth = getAuth();
    console.log("Signing out", auth);
    auth.signOut();
    return auth.currentUser; // Should be Null
  }

  deletePassedUser(user: any) {
    deleteUser(user);
    return true;
  }


  // Return True if user is deleted, return false if they are not.
  deleteCurrentUser() {
    var auth = getAuth();
    var user = auth.currentUser;

    if (user == null) {
      return false;
    }

    else {
      deleteUser(user);
      return true;
    }
  }
}
