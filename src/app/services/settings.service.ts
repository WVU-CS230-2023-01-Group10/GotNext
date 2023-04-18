import { Settings } from "./settings-model";
import { Injectable } from "@angular/core";
import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Database } from "@angular/fire/database";
import { query, ref, set } from 'firebase/database';
import { PartyCodeModel } from "../party-entry/party-entry-page/partycode.model";
import { PartyInfo } from "../backend/Partyname-backend-info/party-info/party-info-model";

@Injectable({providedIn: 'root'})



export class SettingsService{
    private DefInitSettings: Settings = {checkInTime: 300}; //default check in time is 5 min

    constructor(private db: AngularFireDatabase){};

    addInitSettings(Partynum: string){
        var ref = this.db.list<PartyInfo>("Party/"+Partynum+"/").query.ref;
        ref.child("Settings").set(this.DefInitSettings); 
    }

    setCheckInTime(Partynumstr: string, time: number){
        var ref = this.db.list<PartyInfo>("Party/"+Partynumstr+"/Settings/checkInTime").query.ref;
        ref.set(time);
    }
}



