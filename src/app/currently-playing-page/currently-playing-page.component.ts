import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfoService } from '../backend/game-backend/game-info.service';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { TeamInfoService } from '../backend/team-backend/team-info.service';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';

@Component({
  selector: 'app-currently-playing-page',
  templateUrl: './currently-playing-page.component.html',
  styleUrls: ['./currently-playing-page.component.css']
})
export class CurrentlyPlayingPageComponent {

  constructor(private router: Router, private gameInfoService: GameInfoService, private partyCodeService: CodeInfoService,
    private teamInfoService: TeamInfoService, private userInfoService: FloatingUserInfoService
    ) {

  }

  // remove user from CurrentlyPlaying node back to floating users node
  exitToGameSelection() {
     // get information on party, game, and team
     const gameName = this.gameInfoService.selectedGameName;
     const partyCode = this.partyCodeService.code;
     const user = this.teamInfoService.User1;
     // first add user back to floating users
     const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.userInfoService.FloatingUser };
     const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
     this.userInfoService.addFloatingUser(partyCodeInfo,floatingUserInfo);
     // call method to exit CurrentlyPlaying node
     this.teamInfoService.deleteCurrentlyPlaying(partyCodeInfo, user, gameName);
     // route user back to game page
     this.router.navigate(['/gamelist'])
  }

  // remove user from entire party and redirect them to login page
  exitParty() {
     // get information on party, game, and team
     const gameName = this.gameInfoService.selectedGameName;
     const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
     const user = this.teamInfoService.User1;
     // call method to exit CurrentlyPlaying node
     this.teamInfoService.deleteCurrentlyPlaying(partyCodeInfo, user, gameName);
     // call method to exit AllUsers
     this.userInfoService.deleteAllUser(partyCodeInfo, user);
     // route user back to game page
     this.router.navigate([''])
  }
}
