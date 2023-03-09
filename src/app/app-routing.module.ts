import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';

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
    path: "partyLogistics",
    component: PartyLogisticsPageComponent,
    title: "partyLogistics"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
