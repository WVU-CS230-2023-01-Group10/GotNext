import { Component } from '@angular/core';
import { CodeInfo } from './code-info-model';
import { CodeInfoService } from './code-info.service';

@Component({
  selector: 'app-partycode-backend',
  templateUrl: './partycode-backend.component.html',
  styleUrls: ['./partycode-backend.component.css']
})
export class PartycodeBackendComponent {
  myInfo: CodeInfo | undefined;
  CodeInfo: any;
  
  constructor(private codeInfoService: CodeInfoService) {

  }
  
}
