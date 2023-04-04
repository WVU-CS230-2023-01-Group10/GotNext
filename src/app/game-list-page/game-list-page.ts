import { Component, OnInit } from '@angular/core';
import { GamePageService } from '../backend/fetching-data/game-list-page-data/game-page.service';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { GameInfo } from '../backend/game-backend/game-info.model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';

@Component({
  selector: 'game-list-page',
  templateUrl: './game-list-page.html',
  styleUrls: ['./game-list-page.css']
})
export class GameListComponent implements OnInit {
  games: GameInfo[] = [];
  users: FloatingUserInfo[] = [];

  constructor(private gamePageService: GamePageService, private partyCodeService: CodeInfoService, private userInfoService: FloatingUserInfoService) {}

  ngOnInit(): void {
    const partyCode = this.partyCodeService.code;
    const username = this.userInfoService.FloatingUser;
    console.log(partyCode,username);
    this.gamePageService.getGames(partyCode).subscribe((games) => {
      this.games = games;
    });
    this.gamePageService.getFloatingUsers(partyCode, username).subscribe((users) => {
      this.users = users;
    });
  }
}
