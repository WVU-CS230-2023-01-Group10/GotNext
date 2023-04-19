import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { FloatingUserInfo } from '../../floatinguser-backend/floatinguser-info.model';
import { GameInfo } from '../../game-backend/game-info.model';


@Injectable({
  providedIn: 'root'
})
export class GamePageService {
  constructor(private db: AngularFireDatabase) {}

  getGames(partyCode: string): Observable<GameInfo[]> {
    return this.db.list<GameInfo>(`Party/${partyCode}/Games`).valueChanges();
  }

  getFloatingUsers(partyCode: string, currentUser: string): Observable<FloatingUserInfo[]> {
    return this.db.list<FloatingUserInfo>(`Party/${partyCode}/FloatingUsers`).snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as FloatingUserInfo }))
      ),
      map(users => users.filter(user => user.FloatingUser !== currentUser))
    );
  }
  
  
}
