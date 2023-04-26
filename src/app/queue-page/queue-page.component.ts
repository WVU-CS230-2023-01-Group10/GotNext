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

  constructor(private teamInfoService: TeamInfoService, private partyCodeService: CodeInfoService, private userInfoService: FloatingUserInfoService, private gamePageService: GamePageService, private queuePageService: QueuePageService,
    private gameInfoService: GameInfoService, private currentUserInfo: UserInfoService, private router: Router) {}

  ngOnInit(): void {

    
    console.log(this.currentUserInfo.currentUser + "is in the queue");

    const partyCode = this.partyCodeService.code;
    const gamename = this.queuePageService.getSelectedGameName();
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    // get players currently playing
    this.queuePageService.getCurrentPlayers(partyCode,gamename).subscribe(async (users) => {
      this.users = users;
      console.log("Getting Current users");
      console.log(this.users);
    });
    this.queuePageService.getTeams(partyCode, gamename).subscribe(async (teams) => {
      this.teams = teams.sort((a, b) => a.timestamp - b.timestamp);;
      // console.log(this.teams);
      // if there are 2 or more teams and no users currently playing
      // if (this.teams.length > 1 && this.users.length == 0) {
      //   this.getFirstUser();
      //   this.getSecondUser();
      //   const firstTeam = this.teams[0].User1;
      //   const isUpNow = await this.teamInfoService.checkIfInUpNow(partyCodeInfo, firstTeam, gamename);
      //   if (isUpNow) {
      //     console.log(`${firstTeam} is up now!`);
      //   }
      // }

      if(this.teams.length >= 1 && this.users.length == 1) {
        this.getFirstUser();
      }
      else if(this.teams.length == 1 && this.users.length == 0) {
        this.getFirstUser();
      }
      else if(this.teams.length >= 2 && this.users.length == 0) {
        this.getFirstUser();
        this.getSecondUser();
      }
      
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
    const user = this.currentUserInfo.currentUser
    // add user to CurrentlyPlaying node
    this.teamInfoService.addCurrentlyPlaying(partyCodeInfo, user, gameName);
    // remove user from NowUp node
    this.teamInfoService.deleteUpNow(partyCodeInfo, user, gameName);
    // remove user from team node so they are removed from queue
    this.teamInfoService.deleteTeam(partyCodeInfo, user, gameName);
    // reroute to playing/exit page
    this.router.navigate(['/currentlyPlaying']);
  }
  
  }

