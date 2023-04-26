import { Component } from '@angular/core';
import { TeamInfo } from './team-info.model';
import { TeamInfoService } from './team-info.service';

@Component({
  selector: 'app-team-backend',
  templateUrl: './team-backend.component.html'
})
export class TeamBackendComponent {
  TeamInfo: TeamInfo | undefined;  
  constructor(private TeamInfoService: TeamInfoService) {

  }
 
}
