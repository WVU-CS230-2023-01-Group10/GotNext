import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CodeInfo } from "./code-info-model";

@Injectable({providedIn: 'root'})
export class CodeInfoService {
  private baseUrl: string = 'https://got-next-app-default-rtdb.firebaseio.com/';
  private myInfoEndpoint = '/';
  constructor(private http:HttpClient) {
    
  }

}