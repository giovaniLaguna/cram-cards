import { Card } from '../card.interface';
import { Answer } from '../answer.interface';

export abstract class AbstractAlg implements Iterator<Card> {
  constructor(public cards: Card[]) { };
  abstract next(lastAnswer?: Answer): IteratorResult<Card>;
  abstract reset(): any;
}