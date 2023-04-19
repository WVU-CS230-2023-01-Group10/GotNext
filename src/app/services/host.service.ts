import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostService {
  private isHostSubject = new BehaviorSubject<boolean>(false);
  
  setIsHost(isHost: boolean): void {
    this.isHostSubject.next(isHost);
  }

  getIsHost(): Observable<boolean> {
    return this.isHostSubject.asObservable();
  }
  constructor() { }
}
