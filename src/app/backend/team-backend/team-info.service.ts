import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {DataSnapshot, query, ref, set} from 'firebase/database';
import { CodeInfo } from "../partycode-backend/code-info-model";
import { TeamInfo } from "./team-info.model";
import { FloatingUserInfoService } from "../floatinguser-backend/floatinguser-info.service";
import { QueuePageService } from "../fetching-data/queue-data/game-page.service";
import { CodeInfoService } from "../partycode-backend/code-info.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { GameInfoService } from "../game-backend/game-info.service";

@Injectable({providedIn: 'root'})
export class TeamInfoService {
  constructor(private db:AngularFireDatabase, private userInfoService: FloatingUserInfoService,
    private partyCodeService: CodeInfoService, private queuePageService:QueuePageService, private router: Router,
    private gameInfoService: GameInfoService
    ) {
    
  }
  // var to update username in navbar
  User1: string='Not set yet';
  // int value to keep track of # of players in each game
  playerCount: number = 0;

  timestamp: number = 0;
 // User2: string='Not set yet';

/**
 * adds user to chosen party under FloatingUser node within a specific party
 */
addTeam(partyCodeInfo: CodeInfo, team: TeamInfo, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/Teams`).query.ref;
  ref.child(team.User1).set(team);
  // update player counter
  this.playerCount = this.playerCount++;
}

/**
 * removes user from team node
 * @param partyCodeInfo 
 * @param team 
 * @param gameName 
 */
deleteTeam(partyCodeInfo: CodeInfo, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/Teams`).query.ref;
  ref.child(team).remove();
  // update player counter
  this.playerCount = this.playerCount--;
}

/**
 * allows user to exit Queue and return to game list page, removes user from game & team nodes
 * @param partyCodeInfo code of current party
 * @param team username of player
 * @param gameName game selected
 */
exitQueue(partyCodeInfo: string, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo}/Games/${gameName}/Teams`).query.ref;
  ref.child(team).remove();
  // update player count
  this.playerCount = this.playerCount--;
}

/**
 * adds the two teams who are currently playing to a separate node
 * @param partyCodeInfo 
 * @param team 
 * @param gameName 
 */
addUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
  ref.child(team).set(team);
}

/**
 * checks if current user on site is up to play in the UpNow node
 * @param partyCodeInfo 
 * @param team 
 * @param gameName 
 * @returns true if user is in UpNow node
 */
async checkIfInUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string): Promise<boolean> {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
  const snapshot = await ref.child(team).once('value');
  return snapshot.exists();
}

/**
 * adds teams who check in into CurrentlyPlaying node
 * @param partyCodeInfo 
 * @param team 
 * @param gameName 
 */
addCurrentlyPlaying(partyCodeInfo: CodeInfo, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/CurrentlyPlaying`).query.ref;
  ref.child(team).set(team);
}

/**
 * Remove user from UpNow node
 * @param partyCodeInfo 
 * @param floatingUserInfo 
 */
deleteUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
  ref.child(team).remove();
}

/**
 * remove user from CurrentlyPlaying node
 * @param partyCodeInfo 
 * @param team 
 * @param gameName 
 */
deleteCurrentlyPlaying(partyCodeInfo: CodeInfo, team: string, gameName: string) {
  const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/CurrentlyPlaying`).query.ref;
  ref.child(team).remove();
}


}