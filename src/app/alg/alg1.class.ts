import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Card } from '../card.interface';
import { Answer } from '../answer.interface';
import { DataService } from '../data.service';

import { AbstractAlg } from './abstract-alg.class';

/**
 * Algorotimo de escolha de cartas
 * Escolhe com base na resposta anterior
 */
export class Alg1 extends AbstractAlg {
  private learning: {card: Card, correctInSequenceCount: number}[] = [];
  private toLearn: Card[] = [];
  private lastAnswer: Answer;

  constructor(cards: Card[], private correctTimesToAdd = 2) {
    super(cards);
    this.toLearn = [...cards];
    this.addLearningCard();
    this.addLearningCard();
  };

  next(lastAnswer?: Answer): IteratorResult<Card> {
    if(lastAnswer) {
      this.calculateCardsPoint(lastAnswer);
      this.lastAnswer = lastAnswer;
    }

    if(this.didMasterLearningCards()) {
      this.addLearningCard();
    }

    return {
      value: this.getRandomCard(lastAnswer ? lastAnswer.card : undefined),
      done: false
    };
  }

  reset() {
    this.toLearn = [...this.cards];
    this.learning = []
  };

  addLearningCard() {
    if(this.toLearn.length == 0) {
      return;
    }

    this.learning.forEach( (lc, index, array) => array[index].correctInSequenceCount = 0);
    this.learning.push({card: this.toLearn.pop(), correctInSequenceCount: 0});
  }

  calculateCardsPoint(lastAnswer: Answer) {
    const learningCard = this.learning.find( lc => lc.card.id == lastAnswer.card.id);
    if(learningCard) {
      if(lastAnswer.correct) {
        learningCard.correctInSequenceCount++;
      } else {
        learningCard.correctInSequenceCount = 0;
      }
    }
  }

  didMasterLearningCards(): boolean {
    return this.learning.every( lc => lc.correctInSequenceCount >= this.correctTimesToAdd);
  }

  getRandomCard(lastCard?: Card) {
    // remover ultimo item visto dos random cards
    let cards = [...this.learning];
    if(lastCard) {
      const index = cards.findIndex( c => c.card.id == lastCard.id);
      cards.splice(index, 1);
    }

    return cards[Math.floor(Math.random() * cards.length)].card;
  }

}
