import { Component } from '@angular/core';
import { CardManagerService } from './card-manager.service';
import { Answer } from './answer.interface';
import { Card } from './card.interface';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  currentCard: Card;
  currentCardInfo: any;
  allCardsInfo: any;
  
  constructor(
    public cardManagerService: CardManagerService
  ) {}

  ngOnInit() {
    this.cardManagerService.card$.subscribe( card => {
      this.currentCard = card;
      this.currentCardInfo = this.cardManagerService.getCardInfoById(card.id);
      this.allCardsInfo = this.cardManagerService.getCardsInfo();
    })
  }

  sendAnswer(answer: Answer) {
    console.log({answer});
    this.cardManagerService.sendAnswer({...answer})
  }

}
// exercicio para habilidade de percepção
  // - treinamento repetitivo de percepção de mesmos sons
  // - testes de percepção nos pontos analisados como dificeis, com técnica de restrição de similiaridades
  // - 
// exercicio para habilidade de reprodução dos sons
  //  - treinamento repetitivo com mesmo tons em sequencia
  // - montar audio com mesmos tons em palavras diferentes em sequencia tons, 20 combinações possiveis => 3min para cada combinação, audio com 1 hora, repetir silabas junto com audio no segundo modo de treinamento


// Ideias
// - input de digitação de card [ok] (bug no auto focus)
// - controle por teclas [ok]
// - feedback visual / painel de pontos
// - botão de reset
// - timer / cronometro adicionar tempo gasto na resposta na answer
// - painel de listagem de cards
// - painel de importação / exportação  de cards
// - novos algoritmos / configuração do algoritimo e escolha de algoritimos diferentes
// - tipos de cards / dependendo do tipo troca cartão do card
// - 