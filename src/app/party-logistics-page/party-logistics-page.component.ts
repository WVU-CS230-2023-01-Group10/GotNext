import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInfo } from '../backend/game-backend/game-info.model';
import { GameInfoService } from '../backend/game-backend/game-info.service';
import { CodeInfo } from '../backend/partycode-backend/code-info-model';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';

@Component({
  selector: 'app-party-logistics-page',
  templateUrl: './party-logistics-page.component.html',
  styleUrls: ['./party-logistics-page.component.css']
})
export class PartyLogisticsPageComponent {
selectedGameType: string = 'Blank';

constructor(private GameInfoService: GameInfoService, private PartyCodeInfoService: CodeInfoService, private router: Router) {
  
}



onSubmit() {
  const gameInfo: GameInfo = { Style: this.selectedGameType };
  const partyCodeInfo: CodeInfo = { Partycode: this.PartyCodeInfoService.code };
  this.GameInfoService.addGame(partyCodeInfo, gameInfo);
  this.router.navigate(['/gamelist']);
}

}
