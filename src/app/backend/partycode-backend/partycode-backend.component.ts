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
  ngOnInit(): void {
    console.log("Sending a get request to the server");
    this.showCodeInfo();
  }

  showCodeInfo() {
    const partyCode = { PartyCode: '' };
    this.codeInfoService.getCodeInfo(partyCode.PartyCode).subscribe((data: CodeInfo) => {
      console.log(data);
      this.myInfo = data;
    })
  }
}
