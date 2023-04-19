import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HostLoginPageComponent } from './host-login-page/host-login-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { GameListComponent } from './game-list-page/game-list-page';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { PartyEntryPageComponent } from './party-entry/party-entry-page/party-entry-page.component';
import { ScanQrComponent } from './party-entry/scan-qr/scan-qr.component';
import { CurrentlyPlayingPageComponent } from './currently-playing-page/currently-playing-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    title: "Got Next?"
  },
  {
    path: "userlogin",
    component: UserLoginPageComponent,
    title: "User Login"
  },
  {
    path: "gamelist",
    component: GameListComponent,
    title: "Player Party Page"
  },
  {
    path: "partylogistics",
    component: PartyLogisticsPageComponent,
    title: "partyLogistics"
  },
  {
    path: "queue",
    component: QueuePageComponent,
    title: "queuePage"
  },
  {
    path: "hostlogin",
    component: HostLoginPageComponent,
    title: "Host Login"
  },
  {
    path: "qrpage",
    component: QrPageComponent,
    title: "QR Page"
  },
  {
    path: "partyentry",
    component: PartyEntryPageComponent,
    title: "Choose Party"
  },
  {
    path: "scanqr",
    component: ScanQrComponent,
    title: "Scan Party Code"
  },
  {
    path: "currentlyPlaying",
    component: CurrentlyPlayingPageComponent,
    title: "Playing Game"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
