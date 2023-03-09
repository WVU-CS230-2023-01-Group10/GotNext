import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserInfoComponent } from './Username-backend-info/user-info/user-info.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { PlayerPartyPage } from './player-path/player-party-page';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { HostLoginPageComponent } from './host-login-page/host-login-page.component';
import { PartyInfoComponent } from './Partyname-backend-info/party-info/party-info.component';
import { QrPageComponent } from './qr-page/qr-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserInfoComponent,
    LoginPageComponent,
    PartyLogisticsPageComponent,
    QueuePageComponent,
    PlayerPartyPage,
    PartyLogisticsPageComponent,
    HostLoginPageComponent,
    PartyInfoComponent,
    QrPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
