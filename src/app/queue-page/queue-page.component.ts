import { Component, Input, OnInit } from '@angular/core';
import { TeamInfo } from '../backend/team-backend/team-info.model';
import { TeamInfoService } from '../backend/team-backend/team-info.service';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { GameInfoService } from '../backend/game-backend/game-info.service';
import { GamePageService } from '../backend/fetching-data/game-list-page-data/game-page.service';
import { GameInfo } from '../backend/game-backend/game-info.model';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { QueuePageService } from '../backend/fetching-data/queue-data/game-page.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { Router } from '@angular/router';
import { SettingsService } from '../services/settings.service';
import { delay } from 'rxjs';
@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.css']
})
export class QueuePageComponent implements OnInit{
  games: GameInfo[] = [];
  users: TeamInfo[] = [];
  teams: TeamInfo[] = [];
  displayCheckInMessage: boolean = false;
  isCheckedIn: boolean = false;
  checkInTime: number = 999999; // time user has to check in 
  // ID to start/stop timer user has to check in
  checkInTimerId: ReturnType<typeof setTimeout> | undefined;
  // remaining time to check in
  public remainingTime: number = 0;
  private timer: NodeJS.Timer;

  constructor(private teamInfoService: TeamInfoService, private partyCodeService: CodeInfoService, private userInfoService: FloatingUserInfoService, private gamePageService: GamePageService, private queuePageService: QueuePageService,
    private gameInfoService: GameInfoService, private currentUserInfo: UserInfoService, private router: Router, private settingService: SettingsService) 
  {   
    // call the function every 1/2 seconds
    this.timer = setInterval(() => {
    // checks for updates in queue
    this.updateQueue();
    }, 1000); // interval is in milliseconds, so 1000 ms = 1 seconds

  }

  async ngOnInit(): Promise<void> {
    console.log(this.currentUserInfo.currentUser + "is in the queue");

    const partyCode = this.partyCodeService.code;
    const gamename = this.queuePageService.getSelectedGameName();
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    // get check in time set by host
    this.checkInTime = await this.settingService.getCheckInTime(partyCode);
    // get players currently playing
    this.queuePageService.getCurrentPlayers(partyCode,gamename).subscribe(async (users) => {
      this.users = users;
      console.log("Getting Current users");
      console.log(this.users);
    });

    // check if current user is up to play
    await delay(1000); // 1000ms = 1s
    if (await this.amIUpNow()) {
      this.displayCheckInMessage = true;
    }
    // set time for players to check in
    this.remainingTime = this.checkInTime;
    // decreases timer each second
    const countdown = () => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        setTimeout(countdown, 1000); // 1000ms = 1s
      } 
      else {
        // clear timer for check in
        clearInterval(this.remainingTime);
        clearTimeout(this.remainingTime);
        // if user does not check in, remove them from party
        // remove user from UpNow node, Teams node, and AllUsers node
        this.teamInfoService.deleteTeam(partyCodeInfo, this.currentUserInfo.currentUser, gamename);
        this.teamInfoService.deleteUpNow(partyCodeInfo, this.currentUserInfo.currentUser, gamename);
        this.userInfoService.deleteAllUser(partyCodeInfo, this.currentUserInfo.currentUser);
        // route user back to home page
        this.router.navigate(['']);

        this.teamInfoService.deleteUpNow(partyCodeInfo, this.currentUserInfo.currentUser, gamename);
      }
    };
    countdown();
  
  }

  updateQueue() {
    const partyCode = this.partyCodeService.code;
    const gamename = this.queuePageService.getSelectedGameName();
    const partyCodeInfo: CodeInfo = {Partycode: this.partyCodeService.code};
    this.queuePageService.getTeams(partyCode, gamename).subscribe(async (teams) => {
      this.teams = teams.sort((a, b) => a.timestamp - b.timestamp);;
      // teams corresponds to # of players in queue
      // users corresponds to # of players currently playing
      if(this.teams.length >= 1 && this.users.length == 1) {
        this.getFirstUser();
      }
      else if(this.teams.length == 1 && this.users.length == 0) {
        this.getFirstUser();
      }
      else if(this.teams.length >= 2 && this.users.length == 0) {
        this.getFirstUser();
        this.getSecondUser();
        const firstTeam = this.teams[0].User1;
        const isUpNow = await this.teamInfoService.checkIfInUpNow(partyCodeInfo, firstTeam, gamename);
      }

      console.log(this.displayCheckInMessage);
      
      
      // check if current user is up to play
      if(await this.amIUpNow()) {
        this.displayCheckInMessage = true;
      }
      console.log(this.displayCheckInMessage);
      
    });
  }

  /**
   * remove Team from Queue back to game list page & floating users node
   */
  exitQueue() {
    // get information on party, game, and team
    const gameName = this.gameInfoService.selectedGameName;
    const partyCode = this.partyCodeService.code;
    const user = this.teamInfoService.User1;
    // first add user back to floating users
    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.userInfoService.FloatingUser };
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    this.userInfoService.addFloatingUser(partyCodeInfo,floatingUserInfo);
    // call method to exit Queue
    this.teamInfoService.exitQueue(partyCodeInfo,user,gameName);
  }

  // set first user in queue as currently playing
  getFirstUser() {
      // get information on party, game, and team
      const gameName = this.gameInfoService.selectedGameName;
      const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
      const firstTeam = this.teams[0].User1;
      this.teamInfoService.addUpNow(partyCodeInfo, firstTeam, gameName);
  }

  // set second user in queue as currently playing
  getSecondUser() {
    if(this.teams.length >= 2) {
      // get information on party, game, and team
      const gameName = this.gameInfoService.selectedGameName;
      const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
      const secondTeam = this.teams[1].User1;
      this.teamInfoService.addUpNow(partyCodeInfo, secondTeam, gameName);
    }
  }

  // checks if current user is up to play
  async amIUpNow() {
    const gameName = this.gameInfoService.selectedGameName;
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    // if player in UpNow is equal to current User
    if(await this.teamInfoService.checkIfInUpNow(partyCodeInfo, this.currentUserInfo.currentUser, gameName)) {
      return true;
    }
    else {
      return false;
    }
  }

  // puts user in CurrentlyPlaying node 
  checkIn() {
    const gameName = this.gameInfoService.selectedGameName;
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    const user = this.currentUserInfo.currentUser;
    // remove team from queue
    this.teamInfoService.deleteTeam(partyCodeInfo, user, gameName);
    // remove user from up now node if checked in
    this.teamInfoService.deleteUpNow(partyCodeInfo, user, gameName);
    // add user to currently playing node
    this.teamInfoService.addCurrentlyPlaying(partyCodeInfo, user, gameName);
    // stop timer so user does not get kicked
    clearInterval(this.remainingTime);
    clearTimeout(this.remainingTime);
    this.remainingTime = 999999;
    // redirect user to playing page
    this.router.navigate(['/currentlyPlaying']);
  }
  
  
}

