import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeResult } from 'ngx-scanner-qrcode';
import { CodeServiceService } from '../code-service.service';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.component.html',
  styleUrls: ['./scan-qr.component.css']
})
export class ScanQrComponent {
  data : string = '';

  public config: ScannerQRCodeConfig = {
    isBeep: false,
    deviceActive: 1,
    constraints: {
      video: {
        width: window.innerWidth
      },
    }
  };

  constructor(private qrcode: NgxScannerQrcodeService, private router: Router, private codeService: CodeServiceService) { 
  }

  // TODO: disable the camera after scan
  public onEvent(e: ScannerQRCodeResult[]): void {
    console.log(e);
    this.data = e[0].value;
    console.log(this.data);

    this.codeService.updateCode(this.data);

    this.router.navigate(['/partyentry'])
  }
}
