import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserInfoComponent } from './backend/Username-backend-info/user-info/user-info.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { GameListComponent } from './game-list-page/game-list-page';
import { PartyLogisticsPageComponent } from './party-logistics-page/party-logistics-page.component';
import { QueuePageComponent } from './queue-page/queue-page.component';
import { HostLoginPageComponent } from './host-login-page/host-login-page.component';
import { PartyInfoComponent } from './backend/Partyname-backend-info/party-info/party-info.component';
import { QrPageComponent } from './qr-page/qr-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { PartyEntryPageComponent } from './party-entry/party-entry-page/party-entry-page.component';
import { ScanQrComponent } from './party-entry/scan-qr/scan-qr.component';
import { NgxScannerQrcodeModule } from 'ngx-scanner-qrcode';
import { QRCodeModule } from 'angularx-qrcode';
import { PartycodeBackendComponent } from './backend/partycode-backend/partycode-backend.component';
import { FloatinguserBackendComponent } from './backend/floatinguser-backend/floatinguser-backend.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UserInfoComponent,
    UserLoginPageComponent,
    PartyLogisticsPageComponent,
    QueuePageComponent,
    GameListComponent,
    PartyLogisticsPageComponent,
    HostLoginPageComponent,
    PartyInfoComponent,
    QrPageComponent,
    NavbarComponent,
    FooterComponent,
    PartyEntryPageComponent,
    ScanQrComponent,
    PartycodeBackendComponent,
    FloatinguserBackendComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    NgxScannerQrcodeModule,
    QRCodeModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
