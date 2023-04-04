import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usernameSource = new BehaviorSubject('');
  private partyCodeSource = new BehaviorSubject('');

  currentUsername = this.usernameSource.asObservable();
  currentPartyCode = this.partyCodeSource.asObservable();

  constructor() { }

  updateUsername(username: string) {
    this.usernameSource.next(username);
  }

  updatePartyCode(partyCode: string) {
    this.partyCodeSource.next(partyCode);
  }
}
