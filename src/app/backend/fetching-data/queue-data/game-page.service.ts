import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { FloatingUserInfo } from '../../floatinguser-backend/floatinguser-info.model';
import { GameInfo } from '../../game-backend/game-info.model';
import { TeamInfo } from '../../team-backend/team-info.model';


@Injectable({
  providedIn: 'root'
})
export class QueuePageService {
  constructor(private db: AngularFireDatabase) {}

  selectedGameName: string ='';
  selectedUser: string = '';

  setSelectedGameName(gameName: string) {
    this.selectedGameName = gameName;
  }

  getSelectedGameName() {
    return this.selectedGameName;
  }

  setSelectedUser(User2: string) {
    this.selectedUser = User2;
  }

  getSelectedUser() {
    return this.selectedUser;
  }


  getTeams(partyCode: string, GameName: string): Observable<TeamInfo[]> {
    return this.db.list<TeamInfo>(`Party/${partyCode}/Games/${GameName}/Teams`).valueChanges();
  }
  
  
}