import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { CodeInfo } from "../partycode-backend/code-info-model";
import { TeamInfo } from "./team-info.model";
import { FloatingUserInfoService } from "../floatinguser-backend/floatinguser-info.service";
import { QueuePageService } from "../fetching-data/queue-data/game-page.service";
import { CodeInfoService } from "../partycode-backend/code-info.service";
import { Router } from "@angular/router";
import { Observable, combineLatest, map, take } from "rxjs";
import { GameInfoService } from "../game-backend/game-info.service";

/**
 * Typescript file to handle team services and to manipulate data in the realtime database
 * @file team-info.service.ts
 * @author Nathan Mullins
 * @author Ian Jackson
 * @author Bryn Shunney
 * @date Mar 3, 2023
 */

@Injectable({providedIn: 'root'})
export class TeamInfoService {

  /**
   * constructor for the TeamInfoService
   * defines a variety of services and components
   * TODO: look at reducing the amount of services needed
   */
  constructor(private db:AngularFireDatabase, private userInfoService: FloatingUserInfoService,
    private partyCodeService: CodeInfoService, private queuePageService:QueuePageService, private router: Router,
    private gameInfoService: GameInfoService
    ) {
    
  }

  // define and initialize user for a team
  User1: string='Not set yet';

  // define and initialize integer value to keep track of number of players in each game
  playerCount: number = 0;

  // define and initialize integer value to store time in which team was created
  timestamp: number = 0;

  /**
   * adds user to chosen party under FloatingUser node in RealTime database
   * @param partyCodeInfo code of chosen party 
   * @param team username of player
   * @param gameName name of selected game to join
   */
  addTeam(partyCodeInfo: CodeInfo, team: TeamInfo, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/Teams`).query.ref;
    ref.child(team.User1).set(team);
    // update player counter
    this.updatePlayerCount(partyCodeInfo, gameName, "inc");
  }

  /**
   * removes user from team node in RealTime database
   * @param partyCodeInfo code of chosen party 
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  deleteTeam(partyCodeInfo: CodeInfo, team: string, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/Teams`).query.ref;
    ref.child(team).remove();
    // update player counter
    this.updatePlayerCount(partyCodeInfo, gameName, "dec");
  }

  /**
   * allows user to exit Queue and return to game list page, removes user from game & team nodes in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  exitQueue(partyCodeInfo: CodeInfo, team: string, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/Teams`).query.ref;
    ref.child(team).remove();
    // update player counter
    this.updatePlayerCount(partyCodeInfo, gameName, "dec");
  }

  /**
   * adds the two teams who are currently playing to a separate 'UpNow' node in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  addUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
    ref.child(team).set(team);
  }

  /**
   * checks if current user in queue is up to play in the UpNow node in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   * @returns true if user is in UpNow node, false if user is not
   */
  async checkIfInUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string): Promise<boolean> {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
    const snapshot = await ref.child(team).once('value');
    return snapshot.exists();
  }

  /**
   * adds teams who check in into CurrentlyPlaying node in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  addCurrentlyPlaying(partyCodeInfo: CodeInfo, team: string, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/CurrentlyPlaying`).query.ref;
    ref.child(team).set(team);
  }

  /**
   * removes user from UpNow node in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  deleteUpNow(partyCodeInfo: CodeInfo, team: string, gameName: string) {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/UpNow`).query.ref;
    ref.child(team).remove();
  }

  /**
   * removes user from CurrentlyPlaying node in RealTime database
   * @param partyCodeInfo code of current party
   * @param team username of player
   * @param gameName name of game team/user is currently in
   */
  deleteCurrentlyPlaying(partyCodeInfo: CodeInfo, team: string, gameName: string): void {
    const ref = this.db.list<TeamInfo>(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/CurrentlyPlaying`).query.ref;
    ref.child(team).remove();
  }

  /**
   * updates the player count in the RealTime database for the specified game
   * @param partyCodeInfo party code for the party to be edited
   * @param gameName name of game for count to be edited
   * @param mode "inc" increments the count by 1, "dec" decrements the count by 1
   */
  updatePlayerCount(partyCodeInfo: CodeInfo, gameName: string, mode: string) {
    // get ref of the player count
    const countRef = this.db.object(`Party/${partyCodeInfo.Partycode}/Games/${gameName}`);

    // make changes on ref
    countRef.snapshotChanges()
      .pipe(take(1)) // add the take(1) operator to automatically unsubscribe after the first emission
      .subscribe(data => {
        // get current count
        let currentCount = Number(data.payload.child('NumPlayers').val());
        if (mode === "inc") {
          // if mode is increment, add 1 to count
          currentCount++;
        } else if (mode === "dec") {
          // if mode is decrement, sub 1 from count
          currentCount--;
        }
        countRef.update({ NumPlayers: currentCount }); 
      });
  }

  /**
   * compares username in UpNow node and AllUsers node in Realtime database
   * @param partyCode party code of current party
   * @param gameName name of game user is currently in
   * @param username name of player
   * @returns true if username is in both nodes, false if not
   */
  checkUserInUpNowAndAllUsers(partyCode: string, gameName: string, username: string): Observable<boolean> {
    // Get the values of the UpNow and AllUsers nodes
    const upNow$ = this.db.object(`Party/${partyCode}/Games/${gameName}/UpNow`).valueChanges();
    const allUsers$ = this.db.object(`Party/${partyCode}/AllUsers/${username}`).valueChanges();

    // Combine the values and compare them
    return combineLatest([upNow$, allUsers$]).pipe(
      map(([upNow, allUsers]) => {
        // if username in both nodes
        if (upNow && allUsers) {
          return allUsers.hasOwnProperty(upNow.toString());
        } else {
          // username not in both nodes
          return false;
        }
      })
    );
  }
}