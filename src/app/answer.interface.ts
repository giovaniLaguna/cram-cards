import { Card } from './card.interface';

export interface Answer {
  dateTime: string;
  correct: boolean;
  card: Card;
}