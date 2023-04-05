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

@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.css']
})
export class QueuePageComponent implements OnInit{
  games: GameInfo[] = [];
  users: FloatingUserInfo[] = [];
  teams: TeamInfo[] = [];

  constructor(private teamInfoService: TeamInfoService, private partyCodeService: CodeInfoService, private userInfoService: FloatingUserInfoService, private gamePageService: GamePageService, private queuePageService: QueuePageService) {}

  ngOnInit(): void {
    const partyCode = this.partyCodeService.code;
    const gamename = this.queuePageService.getSelectedGameName();
    this.queuePageService.getTeams(partyCode, gamename).subscribe((teams) => {
      this.teams = teams;
      console.log(this.teams);
    });
  }
  
  }

