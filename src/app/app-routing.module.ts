import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PlayerPartyPage } from './player-path/player-party-page';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';

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
    path: "player_party",
    component: PlayerPartyPage,
    title: "Player Party Page"
  },
  {
    path: "partyLogistics",
    component: PartyLogisticsPageComponent,
    title: "partyLogistics"
  },
  {
    path: "queue",
    component: QueuePageComponent,
    title: "queuePage"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
