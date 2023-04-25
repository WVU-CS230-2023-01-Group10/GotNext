import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../backend/auth/AuthResponse';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
      "returnSecureToken": false
    };

    // makes HTTP request with anonymous endpoint sending request body
    return this.http.post<AuthResponse>(this.baseUrl + ':' + this.anonymousEndpoint + '?' + 
      'key=' + environment.firebase.apiKey, requestBody);
  }
}
