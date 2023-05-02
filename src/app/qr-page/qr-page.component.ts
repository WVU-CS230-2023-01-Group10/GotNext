import { Component, OnInit } from '@angular/core';
import { QRCodeElementType } from 'angularx-qrcode';
import { CodeInfoService } from '../backend/partycode-backend/code-info.service';

/**
 * Typescript file to provide functionality to qr page
 * @file qr-page.component.ts
 * @author Ian Jackson
 * @date April 24, 2023
*/

@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css']
})
export class QrPageComponent implements OnInit {
  public elementType: QRCodeElementType = "canvas"

  // default value for partyCode before it gets formally set
  partyCode: string = "ERROR";

  constructor(private partyCodeService: CodeInfoService) {}
  /**
   * Runs on page initialization
   * sets the party code variable to the party code from the backend
   */
  ngOnInit(): void {
    this.partyCode = this.partyCodeService.code;
  }

  /**
   * Save a passed in element as an image. 
   * @param parent element to save, must be either canvas, img, or url type
   */
  saveAsImage(parent: any) {
    let parentElement = null

    if (this.elementType === "canvas") {
      // fetches base 64 data from canvas
      parentElement = parent.qrcElement.nativeElement
        .querySelector("canvas")
        .toDataURL("image/png")

    } else if (this.elementType === "img" || this.elementType === "url") {
      // fetches base 64 data from image
      // parentElement contains the base64 encoded image src
      // you might use to store somewhere
      parentElement = parent.qrcElement.nativeElement.querySelector("img").src

    } else {
      alert("Set elementType to 'canvas', 'img' or 'url'.")
    }

    if (parentElement) {
      // converts base 64 encoded image to blobData
      let blobData = this.convertBase64ToBlob(parentElement)
      // saves as image
      const blob = new Blob([blobData], { type: "image/png" })
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      // name of the file
      link.download = "Qrcode"
      link.click()
    }
  }

  /**
   * This function takes in a base 64 image string and returns a blob of that string
   * @param Base64Image image string to convert
   * @returns blob that input was converted to
   */
  private convertBase64ToBlob(Base64Image: string) {
    // split into two parts
    const parts = Base64Image.split(";base64,")
    // hold the content type
    const imageType = parts[0].split(":")[1]
    // decode base64 string
    const decodedData = window.atob(parts[1])
    // create unit8array of size same as row data length
    const uInt8Array = new Uint8Array(decodedData.length)

    // insert all character code into uint8array
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i)
    }
    
    // return blob image after conversion
    return new Blob([uInt8Array], { type: imageType })
  }
}
