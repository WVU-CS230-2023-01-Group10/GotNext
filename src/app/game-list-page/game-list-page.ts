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

/**
 * Typescript file to handle events and pull data for the Game List page
 * @file game-list-page.ts
 * @author Ian Jackson
 * @author Nathan Mullins
 * @author Samuel Moody
 * @author Daniel Madden
 * @date Mar 3, 2023
 */

@Component({
  selector: 'game-list-page',
  templateUrl: './game-list-page.html',
  styleUrls: ['./game-list-page.css']
})
export class GameListComponent implements OnInit {
  /* define and initialize arrays of data */
  games: GameInfo[] = []; // data associated with games in the party
  users: FloatingUserInfo[] = []; // list of floating users
  host: string[] = []; // host of party
  gameNames: string[] | undefined = []; // games in the party

  /* define and initialize for selected game and current user */
  selectedGameType: string = 'Blank'; // creating game
  selectedGameName: string = ''; // creating game
  chosenGameName: string = 'Game for Queue'; // adding team to queue
  selectedFloatingUser: string = 'Null User'; // adding teammate

  /* boolean values to handle input errors */
  isGameSelected: boolean = false; // variable for game selection validation
  showGameError: boolean = false; // variable to display error
  isGameNameValid: boolean = false; // variable for creating game name
  isGameTypeValid: boolean = false; // variable for selecting game type
  showGameNameError: boolean = false; // game name invalid
  showGameStyleError: boolean = false; // game style invalid
  showGameNameLengthError: boolean = false; // length of game name too long
  errorOccuredCreatingGame: boolean = false; // game could not be made
  isHost: boolean = false; // is the user a host

  /* define and initialize time for checking into a game */
  selectedCheckInTime: number = 300;

  /**
   * constructor for the GameListComponent
   * defines a variety of services and components
   * TODO: look at reducing the amount of services needed
   */
  constructor(private gamePageService: GamePageService, private GameInfoService: GameInfoService, private partyCodeService: CodeInfoService, 
    private userInfoService: FloatingUserInfoService, private teamInfoService: TeamInfoService, private queuePageService: QueuePageService,
    private hostService: HostService, private http: HttpClient, private floatingUserInfo: UserInfoService, private router: Router,
    private settingsService: SettingsService) {}

  /**
   * runs on initialization of the game list page
   * sets local variables (party code, username, games in party, and isHost)
   */
  ngOnInit(): void {
    this.chosenGame('nullGameName');

    // get host username and party code from host login
    const partyCode = this.partyCodeService.code;
    const username = this.userInfoService.FloatingUser;
    console.log(partyCode,username);

    // get current games in the party
    this.gamePageService.getGames(partyCode).subscribe((games) => {
      this.games = games;
    });

    // set isHost boolean based on if the user is set as a host
    this.hostService.getIsHost().subscribe(bool => {
      this.isHost = bool;
    });     
    
  }

  /**
   * sets the game chosen by the user in the QueuePageService and GameInfoService
   * @param gameName name of the game that is selected
   */
  chosenGame(gameName: string) {
    this.queuePageService.setSelectedGameName(gameName);
    this.GameInfoService.setSelectedGameName(gameName);
  }

  /**
   * adds a new game to the party
   * only accessible to the host of the party
   * @param event MouseEvent to trigger addition of game
   */
  addNewGame(event: MouseEvent) {
    // initialize variables to hold game info and party code info
    const gameInfo: GameInfo = { Style: this.selectedGameType, GameName: this.selectedGameName.trim(), NumPlayers: 0};
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
    if (this.validateGameName() === true && this.checkIfGameNameTaken(gameInfo.GameName) === true) {
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

    // if no errors occurred
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


  /**
   * sends user into selected game
   * user is paired with timestamp of event to organize users in FIFO format
   */
  joinGame() {
    // initializes variables ot hold game name, party code, and "team" (user and timestamp)
    const gameName = this.queuePageService.getSelectedGameName();
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    const team: TeamInfo = {
      User1: this.userInfoService.FloatingUser,
      timestamp: Date.now(),
    };

    // validate game selection
    this.isGameSelected = this.validateGameSelection();

    // check if game is selected
    if (this.isGameSelected === true) {
      this.floatingUserInfo.currentUser = this.userInfoService.FloatingUser;
      this.teamInfoService.addTeam(partyCodeInfo, team, gameName);

      // save users to display in queue
      this.teamInfoService.User1 = this.userInfoService.FloatingUser;

      // remove team users from floating users node
      this.userInfoService.deleteFloatingUser(partyCodeInfo, this.teamInfoService);

      // route to next page
      this.router.navigate(['/queue']);

      this.showGameError = false; // Set error to false if game is selected
    } else {
      this.showGameError = true; // Show error message if game is not selected
    }
  } 

  /**
   * removes selected game from the party
   */
  getRidOfGame(){
    const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
    this.GameInfoService.deleteGame(partyCodeInfo);
  }
  
  /**
   * changes the maximum time to check in to the queue
   * only accessible by the host
   */
  changeCheckInTime(){
    const partyCode = this.partyCodeService.code;
    this.settingsService.setCheckInTime(partyCode, this.selectedCheckInTime);
  }

  /**
   * validates the selected game and ensures it is a valid game to join
   * @returns boolean value if the game selection is valid
   */
  validateGameSelection(): boolean {
    if (this.queuePageService.getSelectedGameName() != "nullGameName" && this.queuePageService.getSelectedGameName() != "Blank Name") {
      return true;
    }

    return false;
    
  }

  /**
   * validates that game style selection is not default value or blank
   * @returns false if the game style is valid
   * TODO: inverse the boolean
   */
  validateGameStyleSelection(): boolean {
    if(this.selectedGameType === "Choose Gameplay Style" || this.selectedGameType === "Blank") {
      return false;
    }
      
    return true;
  }

  /**
   * checks if the proposed game name is available
   * @param game name of the game to be checked
   * @returns true if the game name is available
   */
  checkIfGameNameTaken(game: string): boolean {
    // check games within the party for same name
    for (let aGame of this.gameNames!) {
      if (aGame === game) {
        return false;
      }
    }
    // game name available
    return true;
  }

  /**
   * checks if the inputted game name is valid (doesn't contain any special characters or empty)
   * @returns true if the game name is valid
   */
  validateGameName(): boolean {
    // Check if the input string contains any special characters
    const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if(specialCharsRegex.test(this.selectedGameName)) {
      return false;
    }
    // check for default names
    if(this.selectedGameName.trim() === "") {
      return false;
    } 
    // only reached if name passes all 3 validation tests above
    return true;
  }

  /**
   * ensures the game name is less than 15 characters
   * @returns true if game name is above 15 characters
   */
  validateGameNameLength(): boolean {
    const gameInfo: GameInfo = { Style: this.selectedGameType, GameName: this.selectedGameName, NumPlayers: 0};
    if(this.selectedGameName.length > 15) {
      return true;
    }
    else {
      return false;
    }
  }
}

