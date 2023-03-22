import {Component} from '@angular/core';
import { ScannerQRCodeConfig, NgxScannerQrcodeService, ScannerQRCodeResult } from 'ngx-scanner-qrcode';

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

  constructor(private qrcode: NgxScannerQrcodeService) { }

  public onEvent(e: ScannerQRCodeResult[]): void {
    console.log(e);
    this.data = e[0].value;
    console.log(this.data)
  }
}
