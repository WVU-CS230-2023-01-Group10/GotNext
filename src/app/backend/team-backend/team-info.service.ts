import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import {query, ref, set} from 'firebase/database';
import { CodeInfo } from "../partycode-backend/code-info-model";
import { TeamInfo } from "./team-info.model";
import { FloatingUserInfoService } from "../floatinguser-backend/floatinguser-info.service";
import { QueuePageService } from "../fetching-data/queue-data/game-page.service";
import { CodeInfoService } from "../partycode-backend/code-info.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

@Injectable({providedIn: 'root'})
export class TeamInfoService {
  constructor(private db:AngularFireDatabase, private userInfoService: FloatingUserInfoService,
    private partyCodeService: CodeInfoService, private queuePageService:QueuePageService, private router: Router
    
    ) {
    
  }
  // var to update username in navbar
  User1: string='Not set yet';
  // int value to keep track of # of players in each game
  playerCount: number = 0;
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
  //ref.child(floatingUserInfo.User2).remove();
}

}