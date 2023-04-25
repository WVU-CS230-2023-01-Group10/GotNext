import { HttpClient } from '@angular/common/http';
import { Component, NgModule, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { UserService } from '../services/user.service';
import { HostService } from '../services/host.service';
import { UserInfoService } from '../backend/Username-backend-info/user-info/user-info.service';
import { AuthResponse } from '../backend/auth/AuthResponse';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})



export class UserLoginPageComponent implements OnInit, OnDestroy {
  isValid: boolean = false;
  isTaken: boolean = false;
  showInputError: boolean = false;
  showTakenError: boolean = false;
  showNameLengthError: boolean = false;
  partyCode: string = '';
  usernames: string[] | undefined = [];

  subscription: Subscription | any;

  private authObservable!: Observable<AuthResponse>;
  
  constructor(private FloatingUserinfoService: FloatingUserInfoService, private PartyCodeInfoService: CodeInfoService, private router: Router, private userService: UserService, private http: HttpClient, private hostService: HostService,
    private currentUserInfo: UserInfoService, private authService: AuthService) {

  }

  /**
   * Runs on page close, cleans up data
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Runs on initialization, grabs code passed from party entry page and party data from Realtime database
   */
  ngOnInit(): void {
    // get party code from service
    this.subscription = this.userService.currentPartyCode.subscribe(partyCode => {
      this.partyCode = partyCode;

      // if partyCode is null for any reason, navigate back to the party entry page
      if (!this.partyCode) {
      this.router.navigate(['/partyentry']);
      return;
    }
      else {
        // get all users from party
        this.http.get<{ [key: string]: any }>('https://got-next-app-default-rtdb.firebaseio.com/Party/' + this.partyCode + '/AllUsers.json').subscribe(data => {
          this.usernames = Object.keys(data);
        });
      }
    })
  }

  floatingUser: string = '';

  /**
   * allows entered usernames to be stored as floating users for a party
   */
  onSubmit() {

    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.floatingUser };
    const partyCodeInfo: CodeInfo = { Partycode: this.PartyCodeInfoService.code };

    this.isValid = this.validateInput(this.floatingUser);
    this.isTaken = this.checkIfTaken(this.floatingUser);
    this.showNameLengthError = this.validateUserNameLength();

    // if valid, pass input to Realtime database
    if (this.isValid && this.isTaken && (!this.showNameLengthError)) {
      this.showInputError = false;
      this.showTakenError = false;

      // auth user anonymously
      this.authObservable = this.authService.signInAnonymously();

      this.authObservable.subscribe((data: AuthResponse) => {
        // check if user is authed
        if (data.idToken) {
          // calls addFloatinUser and addAllUser methods to store username in database nodes
          this.FloatingUserinfoService.addFloatingUser(partyCodeInfo, floatingUserInfo);
          this.FloatingUserinfoService.addAllUser(partyCodeInfo, floatingUserInfo);

          // set username for game list page
          this.currentUserInfo.currentUser = this.floatingUser;
          this.FloatingUserinfoService.FloatingUser = this.floatingUser;
          
          this.hostService.setIsHost(false);

          // route if user was signed in
          this.router.navigate(['/gamelist']);
        }
      })
    }
    
    // if not valid after check, show error
    this.showInputError = this.isValid ? false : true;

    // if taken, show error
    this.showTakenError = this.isTaken ? false : true;
    
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
    const specialCharsRegex = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
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
    for (let aUser of this.usernames!) {
      if (aUser === user) {
        return false;
        break;
      }
    }

    return true;
  }

  validateUserNameLength() {
    const floatingUserInfo: FloatingUserInfo = { FloatingUser: this.floatingUser };
    if(floatingUserInfo.FloatingUser.length > 15) {
      return true;
    }
    else {
      return false;
    }
  }

}

