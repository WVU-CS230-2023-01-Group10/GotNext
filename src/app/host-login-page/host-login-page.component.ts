import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserInfo } from '../backend/Username-backend-info/user-info/user-info-model';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { PartyInfo } from '../backend/Partyname-backend-info/party-info/party-info-model';
import { PartyInfoService } from '../backend/Partyname-backend-info/party-info/party-info.service';
import { Router } from '@angular/router';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-host-login-page',
  templateUrl: './host-login-page.component.html',
  styleUrls: ['./host-login-page.component.css']
})

export class HostLoginPageComponent implements OnInit {
  isUserValid: boolean = false;
  isCodeValid: boolean = false;
  isUserTaken: boolean = false;
  isCodeTaken: boolean = false;
  isPartyValid: boolean = false;
  showUserError: boolean = false;
  showCodeError: boolean = false;
  showUserTakenError: boolean = false;
  showCodeTakenError: boolean = false;
  showPartyError: boolean = false;

  validPartyCodes: string[] = [];
  
  constructor(private userInfoService: UserInfoService, private partyInfoService: PartyInfoService, private codeInfoService: CodeInfoService, private router: Router, private http: HttpClient) {

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
    this.isUserTaken = this.checkIfTaken(this.Host);
    this.isCodeTaken = this.checkIfCodeTaken(this.PartyCode);

    // if valid, pass info to Realtime Database
    if(this.isUserValid && this.isCodeValid && this.isUserTaken && this.isCodeTaken && this.isPartyValid) {
      this.showCodeError = false;
      this.showCodeTakenError = false;
      this.showUserError = false;
      this.showUserTakenError = false;

      // calls addParty to add party info to database
      this.partyInfoService.addParty(PartyNameInfo);
      this.router.navigate(['/gamelist']);
    }

    // if code not valid, show error
    this.showCodeError = this.isCodeValid ? false : true;

    // if code taken, show error
    this.showCodeTakenError = this.isCodeTaken ? false : true;

    // if user not valid, show error
    this.showUserError = this.isUserValid ? false : true;

    // if user taken, show error
    this.showUserTakenError = this.isUserTaken ? false : true;

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
   * Cross references current users in party with inputted and checks if there is overlap
   * @param user username to be checked
   * @returns a boolean value on if the username is already taken
   */
  checkIfTaken(user: string) : boolean {
    // TODO: implement
    return true;
  }

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
}
