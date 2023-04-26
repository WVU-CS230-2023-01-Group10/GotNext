import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { PartyInfo } from '../backend/Partyname-backend-info/party-info/party-info-model';
import { PartyInfoService } from '../backend/Partyname-backend-info/party-info/party-info.service';
import { Router } from '@angular/router';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { HttpClient } from '@angular/common/http';
import { HostService } from '../services/host.service';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { SettingsService } from '../services/settings.service';
import { Observable, delay } from 'rxjs';
import { AuthResponse } from '../backend/auth/AuthResponse';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent implements OnInit {
  isUserValid: boolean = false;
  isCodeValid: boolean = false;
  isCodeTaken: boolean = false;
  isPartyValid: boolean = false;
  showUserError: boolean = false;
  showCodeError: boolean = false;
  showCodeTakenError: boolean = false;
  showPartyError: boolean = false;
  showInputLengthError: boolean = false;
  showHostInputLengthError: boolean = false;
  showPartyInputLengthError: boolean = false;

  validPartyCodes: string[] = [];

  private authObservable!: Observable<AuthResponse>;
  
  constructor(private userInfoService: UserInfoService, private partyInfoService: PartyInfoService, 
    private codeInfoService: CodeInfoService, private router: Router, private http: HttpClient,
    private hostService: HostService, private floatingUserInfo: FloatingUserInfoService,
    private settingsService: SettingsService, private authService: AuthService) {

  }

  /**
   * Runs on initialization, gets all party codes
   */
  ngOnInit(): void {
    this.http.get<{ [key: string]: any }>('https://got-next-app-default-rtdb.firebaseio.com/Party.json').subscribe(data => {
      this.validPartyCodes = Object.keys(data);
    });
  }

   PartyName: string = '';
   Host: string = '';
   PartyCode: string = '';

  /**
   * allows Party information to be stored through input forms
   */
  onSubmit() {
    const PartyNameInfo: PartyInfo = { Host: this.Host, PartyCode: this.PartyCode, PartyName: this.PartyName };

    // do checks on username and code
    this.isUserValid = this.validateInput(this.Host);
    this.isCodeValid = this.validateCode(this.PartyCode);
    this.isPartyValid = this.validateInput(this.PartyName);
    this.isCodeTaken = this.checkIfCodeTaken(this.PartyCode);

    // check length of Host and PartyName
    this.showHostInputLengthError = this.validateHostNameLength();
    this.showPartyInputLengthError = this.validatePartyNameLength();

    // if valid, pass info to Realtime Database
    if(this.isUserValid && this.isCodeValid && this.isCodeTaken && this.isPartyValid && (!this.showHostInputLengthError) && (!this.showPartyInputLengthError)) {
      this.showCodeError = false;
      this.showCodeTakenError = false;
      this.showUserError = false;

      /* Here is where the issue is popping up */
      /*
      * After checking to see if the input fields are valid, first subscribes to the Auth
      * src/app/services/auth.services.ts
      * Right after subscribing, then calls are made to write to the backend
      * However the console says the user doesnt have permission to make writes
      * See screenshot I sent you for the console output
      */

      // auth host anonymously
      this.authObservable = this.authService.signInAnonymously();

      this.authObservable.subscribe(async (data: AuthResponse) => {
        console.log("Auth called");
        console.log(data);
        await delay(5000);
        if (data.idToken) {
          console.log("Making write calls")
          // calls addParty to add party info to database
          this.partyInfoService.addParty(PartyNameInfo);

          // sets code to be used to sort games
          this.codeInfoService.code = this.PartyCode;

          // add host to users
          const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.Host };
          const partyCodeInfo: CodeInfo = { Partycode: this.PartyCode };
          this.floatingUserInfo.addFloatingUser(partyCodeInfo, floatingUserInfo);
          this.floatingUserInfo.addAllUser(partyCodeInfo, floatingUserInfo);

          this.settingsService.addInitSettings(PartyNameInfo.PartyCode); //adds default party settings
          // set host as floating user for game selection page
          this.floatingUserInfo.FloatingUser = floatingUserInfo.FloatingUser;
          console.log(this.userInfoService.username);

          // sends username and party code to service to be checked for host validity 
          this.hostService.setIsHost(true);
            
          // route if user was signed in
          this.router.navigate(['/gamelist']);
        }
      });
      
    }

    // if code not valid, show error
    this.showCodeError = this.isCodeValid ? false : true;

    // if code taken, show error
    this.showCodeTakenError = this.isCodeTaken ? false : true;

    // if user not valid, show error
    this.showUserError = this.isUserValid ? false : true;

    // if party invalid, show error
    this.showPartyError = this.isPartyValid ? false : true;
  }

  /**
   * Checks if the username input does not contain special characters, is not empty,
   * or (optionally) larger than a specified length
   * @param user username string to be checked
   * @param size optional character limit size
   * @returns a boolean value if the username is a valid input
   */
  validateInput(user: string, size?: number) : boolean {
    // Check if the input string is null or empty
    if (!user || user.length === 0) {
      return false;
    }

    // checks if input string is larger than optional length
    if (size != undefined) {
      if (user.length > size) {
        return false;
      }
    }

    // Check if the input string contains any special characters
    const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialCharsRegex.test(user)) {
      return false;
    }

    // Return true if the input string passes both checks
    return true;
  }

  /**
   * Checks if inputted code is numeric between 4-6 characters
   * @param code code to be checked
   * @returns boolean value if code is a valid input
   */
  validateCode(code: string) : boolean {
    // Check if the input string is null or empty
    if (!code || code.length === 0) {
      return false;
    }

    // Check if the input is a valid number
    if (isNaN(Number(code))) {
      return false;
    }

    // Check if the length of the number is between 4-6 characters
    const numLength = code.length;
    if (numLength < 4 || numLength > 6) {
      return false;
    }

    // Return true if the input passes both checks
    return true;
  }

  /**
   * Checks if inputted code is taken
   * @param code code to be checked
   * @returns boolean value if the code is available
   */
  checkIfCodeTaken(code: string) : boolean {
    // Check if the input string is null or empty
    if (!code || code.length === 0) {
      return true;
    }

    // check all available codes
    for (let aCode of this.validPartyCodes) {
      // if inputted code matches a used code, then not valid
      if (code === aCode) {
        return false;
      }
    }

    // if not, then code valid
    return true;
  }

  validateHostNameLength() {
    const PartyNameInfo: PartyInfo = { Host: this.Host, PartyCode: this.PartyCode, PartyName: this.PartyName };
    if(PartyNameInfo.Host.length > 15) {
      return true;
    }
    else {
      return false;
    }
  }

  validatePartyNameLength() {
    const PartyNameInfo: PartyInfo = { Host: this.Host, PartyCode: this.PartyCode, PartyName: this.PartyName };
    if(PartyNameInfo.PartyName.length > 15) {
      return true;
    }
    else {
      return false;
    }
  }
}
