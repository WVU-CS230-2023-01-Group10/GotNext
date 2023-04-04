import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { CodeInfo } from "../partycode-backend/code-info-model";
import { GameInfo } from "./game-info.model";




@Injectable({providedIn: 'root'})
export class GameInfoService {

  constructor(private http:HttpClient, private db:AngularFireDatabase) {
    
  }

/**
 * adds game to specific party
 * @param partyCodeInfo provides code for specific party
 * @param gameInfo contains type of game selection
 */
addGame(partyCodeInfo: CodeInfo, gameInfo: GameInfo) {
  console.log(partyCodeInfo.Partycode);
  const ref = this.db.list<GameInfo>(`Party/${partyCodeInfo.Partycode}/Games`).query.ref;
  ref.child(gameInfo.Style).set(gameInfo);
}

}