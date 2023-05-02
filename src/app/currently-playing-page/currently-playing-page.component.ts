import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfoService } from '../backend/game-backend/game-info.service';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { TeamInfoService } from '../backend/team-backend/team-info.service';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';

/**
 * Typescript file dealing with functionality of the currently playing page
 * @file currently-playing-page.component.ts
 * @author Nathan Mullins
 * @date April 19th, 2023
 */

@Component({
  selector: 'app-currently-playing-page',
  templateUrl: './currently-playing-page.component.html',
  styleUrls: ['./currently-playing-page.component.css']
})
export class CurrentlyPlayingPageComponent {


  /**
   * constructor for the currenty playing page component
   * defines a variety of services and components
   * TODO: look at reducing the amount of services needed
   */
  constructor(private router: Router, private gameInfoService: GameInfoService, private partyCodeService: CodeInfoService,
    private teamInfoService: TeamInfoService, private userInfoService: FloatingUserInfoService
    ) {

  }

  /**
   *  Takes user out of the game they're in and sends them back to the gamelist page while updating appropriate structures
   */ 
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

 
  /**
   * remove user from entire party and redirect them to login page
   */
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
