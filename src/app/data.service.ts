import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Card } from './card.interface'

@Injectable()
export class DataService {

  constructor() { }

  getCards(): Observable<Card[]> {
    return of([
      {
        id: '1',
        frente: '手 (扌,龵)',
        verso: 'hand',
      },
      {
        id: '2',
        frente: '支',
        verso: 'branch',
      },
      {
        id: '3',
        frente: '攴 (攵)',
        verso: 'rap, tap',
      }
    ]);
  }

}