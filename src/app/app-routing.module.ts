import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HostLoginPageComponent } from './host-login-page/host-login-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlayerPartyPage } from './player-party-page/player-party-page';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { QrPageComponent } from './qr-page/qr-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
    title: "Got Next?"
  },
  {
    path: "userlogin",
    component: LoginPageComponent,
    title: "User Login"
  },
  {
    path: "playerparty",
    component: PlayerPartyPage,
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

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
