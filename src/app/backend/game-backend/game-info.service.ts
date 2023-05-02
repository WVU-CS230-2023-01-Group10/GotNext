import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { CodeInfo } from "../partycode-backend/code-info-model";
import { GameInfo } from "./game-info.model";

/**
 * Typescript file to handle events, game services, and to manipulate data in the realtime database
 * @file game-info.service.ts
 * @author Samuel Moody
 * @author Ian Jackson
 * @author Nathan Mullins
 * @date Mar 3, 2023
 */

@Injectable({providedIn: 'root'})
export class GameInfoService {
  /* define and initialize for name of user and game */
  selectedGameName: string ='dont';
  selectedUserName: string ='Teammate';

  /**
   * constructor for the GameInfoService
   * defines the Angular Fire Databse
   */
  constructor(private db:AngularFireDatabase) {}

  /**
   * sets game name selected by user on game list page
   * @param gameName name of game selected
   */
  setSelectedGameName(gameName: string) {
    this.selectedGameName = gameName;
  }

  /**
   * adds game style for game to specific party in Realtime database
   * @param partyCodeInfo provides code for specific party
   * @param gameInfo contains type of game selection
   */
  addGameStyle(partyCodeInfo: CodeInfo, gameInfo: GameInfo) {
    console.log(partyCodeInfo.Partycode);
    const ref = this.db.list<GameInfo>(`Party/${partyCodeInfo.Partycode}/Games`).query.ref;
    ref.child(gameInfo.Style).set(gameInfo);
  }

  /**
   * adds game name for game to specific party in Realtime database
   * @param partyCodeInfo provides code for specific party
   * @param gameInfo contains type of game selection
   */
  addGameName(partyCodeInfo: CodeInfo, gameInfo: GameInfo) {
    console.log(partyCodeInfo.Partycode);
    const ref = this.db.list<GameInfo>(`Party/${partyCodeInfo.Partycode}/Games`).query.ref;
    ref.child(gameInfo.GameName).set(gameInfo);
  }

  /**
   * removes game from specific party in realtime database
   * @param partyCodeInfo  provides code for specific party 
   */
  deleteGame(partyCodeInfo: CodeInfo){
    this.db.object('Party/' + partyCodeInfo.Partycode + '/Games/' + this.selectedGameName).remove();
  }

}