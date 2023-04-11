import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FloatingUserInfoService } from '../backend/floatinguser-backend/floatinguser-info.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';
import { QueuePageService } from '../backend/fetching-data/queue-data/game-page.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-team-request-popup',
  templateUrl: './team-request-popup.component.html',
  styleUrls: ['./team-request-popup.component.css']
})
export class TeamRequestPopupComponent {
  data: any;

  constructor(private db: AngularFireDatabase, private dialog: MatDialog, private userInfoService: FloatingUserInfoService, public dialogRef: MatDialogRef<TeamRequestPopupComponent>,
    private partyCodeService: CodeInfoService, private queuePageService:QueuePageService, private router: Router,
    ) { }

  
  //   listenForTeamRequests() {
  //     console.log("listen function was called");
  //     const currentUser = this.userInfoService.FloatingUser;
  //     const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
  //     const gameName = this.queuePageService.getSelectedGameName();
  //     this.db.list(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/PendingTeams`).valueChanges().subscribe((requests: any[]) => {
  //       if (requests.length > 0) {
  //         requests.forEach(request => {
  //           const dialogRef = this.dialog.open(TeamRequestPopupComponent, {
  //             data: {
  //               requestId: request.id,
  //               requester: request.requester,
  //               game: request.game
  //             }
  //           });
  //           dialogRef.afterClosed().subscribe(result => {
  //             // Handle the result of the team request dialog
  //           });
  //         });
  //       }
  //     });
  //   }
    
  
  // acceptRequest(requestId: string) {
  //   const currentUser = this.userInfoService.FloatingUser;
  //   const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
  //   const gameName = this.queuePageService.getSelectedGameName();
  //   this.db.object(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/PendingTeams`).update({status: 'accepted'}).then(() => {
  //     // Redirect to the queue page
  //   });
  // }
  
  // declineRequest(requestId: string) {
  //   const currentUser = this.userInfoService.FloatingUser;
  //   const partyCodeInfo: CodeInfo = { Partycode: this.partyCodeService.code };
  //   const gameName = this.queuePageService.getSelectedGameName();
  //   this.db.object(`Party/${partyCodeInfo.Partycode}/Games/${gameName}/PendingTeams`).update({status: 'declined'}).then(() => {
  //     // Close the dialog
  //   });
  // }
  

  // accept(): void {
  //   // Call the acceptRequest function with the request ID
  //   this.acceptRequest(this.data.requestId);
  //   // Close the dialog
  //   this.dialogRef.close();
  // }

  // decline(): void {
  //   // Call the declineRequest function with the request ID
  //   this.declineRequest(this.data.requestId);
  //   // Close the dialog
  //   this.dialogRef.close();
  // }
}
