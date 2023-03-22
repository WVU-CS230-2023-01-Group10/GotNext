import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeServiceService {
  private codeSource = new BehaviorSubject('');
  currentCode = this.codeSource.asObservable();

  constructor() { }

  updateCode(code: string) {
    this.codeSource.next(code)
  }
}
