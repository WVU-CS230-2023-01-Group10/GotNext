import { Component, NgModule } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { FloatingUserInfo } from '../backend/floatinguser-backend/floatinguser-info.model';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';


@Component({
  selector: 'app-user-login-page',
  templateUrl: './user-login-page.component.html',
  styleUrls: ['./user-login-page.component.css']
})



export class UserLoginPageComponent {
  isValid: boolean = false;
  isTaken: boolean = false;
  showInputError: boolean = false;
  showTakenError: boolean = false;
  
  constructor(private FloatingUserinfoService: FloatingUserInfoService, private PartyCodeInfoService: CodeInfoService, private router: Router) {

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

    // if valid, pass input to Realtime database
    if (this.isValid && this.isTaken) {
      this.showInputError = false;
      this.showTakenError = false;

      // calls addFloatinUser and addAllUser methods to store username in database nodes
      this.FloatingUserinfoService.addFloatingUser(partyCodeInfo, floatingUserInfo);
      this.FloatingUserinfoService.addAllUser(floatingUserInfo);
      this.router.navigate(['/gamelist']);
    }
    
    // if not valid after check, show error
    if (!this.isValid) {
      this.showInputError = true
    } 

    // if taken, show error
    if (!this.isTaken) {
      this.showTakenError = true;
    }
    
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
    // TODO: implement
    return true;
  }

}

