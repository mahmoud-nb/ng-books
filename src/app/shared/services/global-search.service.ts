import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {

  _term$ = new BehaviorSubject<string>('');

  constructor() { }

  setTerm( term:string ): void {
    this._term$.next( term );
  }
}
