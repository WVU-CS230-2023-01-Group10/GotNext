import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { HostLoginPageComponent } from './host-login-page/host-login-page.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { GameListPage } from './game-list-page/game-list-page';
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
    component: UserLoginPageComponent,
    title: "User Login"
  },
  {
    path: "gamelist",
    component: GameListPage,
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
