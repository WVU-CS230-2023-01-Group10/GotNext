import { Component, Input } from '@angular/core';
import { TeamInfo } from '../backend/team-backend/team-info.model';

@Component({
  selector: 'app-queue-page',
  templateUrl: './queue-page.component.html',
  styleUrls: ['./queue-page.component.css']
})
export class QueuePageComponent {
  @Input() team!: TeamInfo;
}
