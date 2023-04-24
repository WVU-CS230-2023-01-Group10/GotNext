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
import { Router } from '@angular/router';
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
  gameNames: string[] | undefined = [];
  selectedGameType: string = 'Blank'; // creating game
  selectedGameName: string = ''; // creating game
  selectedFloatingUser: string = 'Null User'; // adding teammate
  chosenGameName: string = 'Game for Queue'; // adding team to queue
  isGameSelected: boolean = false; // variable for game selection validation
  showGameError: boolean = false; // variable to display error
  isGameNameValid: boolean = false; // variable for creating game name
  isGameTypeValid: boolean = false; // variable for selecting game type
  showGameNameError: boolean = false; // game name invalid
  showGameStyleError: boolean = false; // game style invalid
  showGameNameLengthError: boolean = false; // length of game name too long
  errorOccuredCreatingGame: boolean = false; // 
  selectedCheckInTime: number = 300;

  isHost: boolean = false;

  constructor(private gamePageService: GamePageService, private GameInfoService: GameInfoService, private partyCodeService: CodeInfoService, 
    private userInfoService: FloatingUserInfoService, private teamInfoService: TeamInfoService, private queuePageService: QueuePageService,
    private hostService: HostService, private http: HttpClient, private floatingUserInfo: UserInfoService, private router: Router,
    private settingsService: SettingsService) {}

  // getting selected game to join with teammate
  chosenGame(gameName: string) {
    this.queuePageService.setSelectedGameName(gameName);
    this.GameInfoService.setSelectedGameName(gameName);
  }

  ngOnInit(): void {
    this.chosenGame('nullGameName');
    const partyCode = this.partyCodeService.code;
    const username = this.userInfoService.FloatingUser;
    console.log(partyCode,username);
    this.gamePageService.getGames(partyCode).subscribe((games) => {
      this.games = games;
    });

    // get host username and party code from host login
    this.hostService.getIsHost().subscribe(bool => {
      this.isHost = bool;
    });    
    
}

addNewGame(event: MouseEvent) {
  const gameInfo: GameInfo = { Style: this.selectedGameType, GameName: this.selectedGameName};
  const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };

  // get all games from party
  this.http.get<{ [key: string]: any }>('https://got-next-app-default-rtdb.firebaseio.com/Party/' + partyCodeInfo.Partycode + '/Games.json').subscribe(data => {
    if (data) {
      this.gameNames = Object.keys(data);
    }
  });

  event.preventDefault();
  let errorOccurred = false;

  // validate game type
  if (this.selectedGameType === "Blank") {
    this.showGameStyleError = true;
    errorOccurred = true;
  } else {
    this.showGameStyleError = false;
  }

  // validate game name
  if(this.checkIfGameNameTaken(gameInfo.GameName) === true && this.validateGameName() === true) {
    this.isGameNameValid = true;
    this.showGameNameError = false;
  } else {
    this.showGameNameError = true;
    errorOccurred = true;
  }

  // validate game name length
  if(this.validateGameNameLength() === true) {
    this.showGameNameLengthError = true;
    errorOccurred = true;
  }

  // if no errors occured
  if (!errorOccurred) {
    // send game data to back end
    this.showGameNameLengthError = false;
    this.GameInfoService.addGameName(partyCodeInfo, gameInfo);

    this.selectedGameType = 'Blank';
    this.selectedGameName = '';

    // close modal
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
      closeModalButton.click();
    }
  }
}


  joinGame() {
    const gameName = this.queuePageService.getSelectedGameName();
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    const team: TeamInfo = {
      User1: this.userInfoService.FloatingUser,
      timestamp: Date.now(),
    };

    // validate game selection
    this.isGameSelected = this.validateGameSelection();

    if (this.isGameSelected === true) {
      this.floatingUserInfo.currentUser = this.userInfoService.FloatingUser;
      this.teamInfoService.addTeam(partyCodeInfo, team, gameName);
      // save users to display in queue
      this.teamInfoService.User1 = this.userInfoService.FloatingUser;
      //this.teamInfoService.User2 = User2;

      // remove team users from floating users node
      this.userInfoService.deleteFloatingUser(partyCodeInfo, this.teamInfoService);

      // route to next page
      this.router.navigate(['/queue']);

      this.showGameError = false; // Set error to false if game is selected
    } else {
      this.showGameError = true; // Show error message if game is not selected
    }
  } 

  getRidOfGame(){
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    this.GameInfoService.deleteGame(partyCodeInfo);
  }
  
  changeCheckInTime(){
    const partyCode = this.partyCodeService.code;
    this.settingsService.setCheckInTime(partyCode, this.selectedCheckInTime);
  }

  validateGameSelection() {
    if(this.queuePageService.getSelectedGameName() != "nullGameName" && this.queuePageService.getSelectedGameName() != "Blank Name") {
      return true;
    }
    else {
      return false;
    }
  }

  validateGameStyleSelection() {
    if(this.selectedGameType === "Choose Gameplay Style" || this.selectedGameType === "Blank") {
      return false;
    }
    else {
      return true;
    }
  }

  checkIfGameNameTaken(game:string) : boolean {
    // check games within the party for same name
    for(let aGame of this.gameNames!) {
      if(aGame === game) {
        return false;
      }
    }
    // game name available
    return true;
  }


  validateGameName() {
    // Check if the input string contains any special characters
    const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialCharsRegex.test(this.selectedGameName)) {
      return false;
    }
    // check for default names
    if(this.selectedGameName === "Blank Name" || this.selectedGameName === "") {
      return false;
    } 
    else {
      return true;
    }
  }

  validateGameNameLength() {
    const gameInfo: GameInfo = { Style: this.selectedGameType, GameName: this.selectedGameName};
    if(this.selectedGameName.length > 15) {
      return true;
    }
    else {
      return false;
    }
  }
}

