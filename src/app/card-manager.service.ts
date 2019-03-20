import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Card } from './card.interface';
import { Answer } from './answer.interface';
import { DataService } from './data.service';
import { Alg1 } from './alg/alg1.class';
import { AbstractAlg } from './alg/abstract-alg';

@Injectable()
export class CardManagerService {
  private answerHistory: Answer[] = [];
  private currentCardSubject$ = new BehaviorSubject<Card>(null);
  card$ = this.currentCardSubject$.pipe();
  alg: AbstractAlg;

  constructor(
    private dataService: DataService
  ) {

    this.dataService.getCards().subscribe( cards => {
      this.alg = new Alg1(cards);
      this.getNextCard();
    });
  }

  reset() {
    this.answerHistory = [];
    this.alg.reset();
    this.getNextCard();
  }

  sendAnswer(answer: Answer) {
    this.answerHistory.push(answer);
    this.getNextCard(answer);
  }

  getCardsInfo() {
    return this.calcAnswersInfo(this.answerHistory);
  }

  getCardInfoById(id: string) {
    const answers = this.answerHistory.filter( a => a.card.id == id);
    return this.calcAnswersInfo(answers);
  }

  private calcAnswersInfo(answers: Answer[]) {
    console.log('calcAnswersInfo', {answers});
    const answersQty = answers.length;
    const correctQty = answers.reduce( (somatorio, answer) => answer.correct ? ++somatorio : somatorio,0);
    const incorrectQty = answersQty - correctQty;


    // calc max maxComboQty
    let maxComboQty: number;
    {
      let aux = [0];
      let auxIndex = 0;

      for(let answer of answers) {
        if(answer.correct) {
          aux[auxIndex]++;
        } else {
          if(aux[auxIndex] > 0) {
            auxIndex++;
            aux[auxIndex] = 0;
          }
        }
      }

      maxComboQty = Math.max(...aux);
    }

    // calc max maxComboQty
    let lastComboQty = 0;
    {
      for(let answer of answers.reverse()) {
        if(answer.correct) {
          lastComboQty++;
        } else {
          break;
        }
      }
    }
  
    return {
      answersQty,
      correctQty,
      incorrectQty,
      maxComboQty,
      lastComboQty,
    }
  }

  private getNextCard(lastAnswer?: Answer) {
    // lógica de escolha de próximo cartão
    const result = this.alg.next(lastAnswer);
    console.log("lastAnswer from getNextCard", lastAnswer);

    if(!result.done) {
      this.currentCardSubject$.next(result.value);
    } else {
      this.currentCardSubject$.complete();
    }
    
  }

}