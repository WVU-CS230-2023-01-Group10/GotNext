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
@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.css']
})
export class QueuePageComponent implements OnInit{
  games: GameInfo[] = [];
  users: FloatingUserInfo[] = [];
  teams: TeamInfo[] = [];

  constructor(private teamInfoService: TeamInfoService, private partyCodeService: CodeInfoService, private userInfoService: FloatingUserInfoService, private gamePageService: GamePageService, private queuePageService: QueuePageService,
    private gameInfoService: GameInfoService) {}

  ngOnInit(): void {
    const partyCode = this.partyCodeService.code;
    const gamename = this.queuePageService.getSelectedGameName();
    this.queuePageService.getTeams(partyCode, gamename).subscribe((teams) => {
      this.teams = teams;
      console.log(this.teams);
      this.getFirstUser();
      this.getSecondUser();
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
    this.teamInfoService.exitQueue(partyCode,user,gameName);
  }

  // set first user in queue as currently playing
  getFirstUser() {
      // get information on party, game, and team
      const gameName = this.gameInfoService.selectedGameName;
      const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
      const firstTeam = this.teams[0].User1;
      this.teamInfoService.addCurrentlyPlaying(partyCodeInfo, firstTeam, gameName);
  }

  // set second user in queue as currently playing
  getSecondUser() {
    if(this.teams.length >= 2) {
      // get information on party, game, and team
      const gameName = this.gameInfoService.selectedGameName;
      const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
      const secondTeam = this.teams[1].User1;
      this.teamInfoService.addCurrentlyPlaying(partyCodeInfo, secondTeam, gameName);
    }
  }
  
  }

