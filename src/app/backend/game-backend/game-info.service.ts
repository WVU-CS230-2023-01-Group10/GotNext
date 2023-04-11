import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { CodeInfo } from "../partycode-backend/code-info-model";
import { GameInfo } from "./game-info.model";




@Injectable({providedIn: 'root'})
export class GameInfoService {

  constructor(private db:AngularFireDatabase) {
    
  }

  selectedGameName: string ='dont';
  selectedUserName: string ='Teammate';

  setSelectedGameName(gameName: string) {
    this.selectedGameName = gameName;
  }

  setSelectedUserName(User2: string) {
    this.selectedUserName = User2;
  }

/**
 * adds game to specific party
 * @param partyCodeInfo provides code for specific party
 * @param gameInfo contains type of game selection
 */
addGameStyle(partyCodeInfo: CodeInfo, gameInfo: GameInfo) {
  console.log(partyCodeInfo.Partycode);
  const ref = this.db.list<GameInfo>(`Party/${partyCodeInfo.Partycode}/Games`).query.ref;
  ref.child(gameInfo.Style).set(gameInfo);
}

addGameName(partyCodeInfo: CodeInfo, gameInfo: GameInfo) {
  console.log(partyCodeInfo.Partycode);
  const ref = this.db.list<GameInfo>(`Party/${partyCodeInfo.Partycode}/Games`).query.ref;
  ref.child(gameInfo.GameName).set(gameInfo);
}

deleteGame(partyCodeInfo: CodeInfo){
  this.db.object('Party/' + partyCodeInfo.Partycode + '/Games/' + this.selectedGameName).remove();
}

}