import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CodeInfo } from "./code-info-model";

@Injectable({providedIn: 'root'})
export class CodeInfoService {

  code: string = '';
  
}