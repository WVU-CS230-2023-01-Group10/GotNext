import { Component, NgModule, OnInit } from '@angular/core';
import { GamePageService } from '../backend/fetching-data/game-list-page-data/game-page.service';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { GameInfo } from '../backend/game-backend/game-info.model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { GameInfoService } from '../backend/game-backend/game-info.service';
import { TeamInfoService } from '../backend/team-backend/team-info.service';
import { TeamInfo } from '../backend/team-backend/team-info.model';
import { QueuePageService } from '../backend/fetching-data/queue-data/game-page.service';
import { HostService } from '../services/host.service';
import { HttpClient } from '@angular/common/http';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { SettingsService } from '../services/settings.service';


@Component({
  selector: 'game-list-page',
  templateUrl: './game-list-page.html',
  styleUrls: ['./game-list-page.css']
})
export class GameListComponent implements OnInit {
  games: GameInfo[] = [];
  users: FloatingUserInfo[] = [];
  host: string[] = [];
  selectedGameType: string = 'Blank'; // creating game
  selectedGameName: string = 'Blank Name'; // creating game
  selectedFloatingUser: string = 'Null User'; // adding teammate
  chosenGameName: string = 'Game for Queue'; // adding team to queue
  selectedCheckInTime: number = 300;

  isHost: boolean = false;

  constructor(private gamePageService: GamePageService, private GameInfoService: GameInfoService, private partyCodeService: CodeInfoService, 
    private userInfoService: FloatingUserInfoService, private teamInfoService: TeamInfoService, private queuePageService: QueuePageService,
    private hostService: HostService, private http: HttpClient, private floatingUserInfo: UserInfoService,
    private settingsService: SettingsService) {}

  // getting selected game to join with teammate
  chosenGame(gameName: string) {
    this.queuePageService.setSelectedGameName(gameName);
    this.GameInfoService.setSelectedGameName(gameName);
  }

  // getting selected user as teammate
  // chosenUser(User2: string) {
  //   this.queuePageService.setSelectedUser(User2);
  //   this.GameInfoService.setSelectedUserName(User2);
  //   this.selectedFloatingUser = User2;
  // }

  ngOnInit(): void {
    this.chosenGame('nullGameName');
    const partyCode = this.partyCodeService.code;
    const username = this.userInfoService.FloatingUser;
    console.log(partyCode,username);
    this.gamePageService.getGames(partyCode).subscribe((games) => {
      this.games = games;
    });
    // this.gamePageService.getFloatingUsers(partyCode, username).subscribe((users) => {
    //   this.users = users;
    // });

    // get host username and party code from host login
    this.hostService.getIsHost().subscribe(bool => {
      this.isHost = bool;
    });
  

}

  addNewGame() {
    const gameInfo: GameInfo = { Style: this.selectedGameType, GameName: this.selectedGameName};
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    // this.GameInfoService.addGameStyle(partyCodeInfo, gameInfo);
    this.GameInfoService.addGameName(partyCodeInfo, gameInfo);
    // console.log(this.selectedGameName, this.selectedGameType);
    // this.router.navigate(['/gamelist']);
  }

  joinGame() {
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    const gameName = this.queuePageService.getSelectedGameName();
   // const User2 = this.queuePageService.getSelectedUser();
    const team: TeamInfo = {
      User1: this.userInfoService.FloatingUser,
      //User2: this.selectedFloatingUser,
    };
    this.teamInfoService.addTeam(partyCodeInfo, team, gameName);
    // save users to display in queue
    this.teamInfoService.User1 = this.userInfoService.FloatingUser;
    //this.teamInfoService.User2 = User2;

    // remove team users from floating users node
    this.userInfoService.deleteFloatingUser(partyCodeInfo, this.teamInfoService);
  }

  getRidOfGame(){
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    this.GameInfoService.deleteGame(partyCodeInfo);
  }

  changeCheckInTime(){
    const partyCode = this.partyCodeService.code;
    this.settingsService.setCheckInTime(partyCode, this.selectedCheckInTime);
  }

  
  
}
