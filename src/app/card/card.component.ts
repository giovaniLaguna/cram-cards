import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Card } from '../card.interface';
import { Answer } from '../answer.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('card') set setCard(card: Card) {
    this.mode = 'pergunta';
    this.card = card;
    this.textoLivreInputFocus();
  }
  card: Card;
  textoLivre = "";

  @ViewChild('textoLivreInput') textoLivreInput: ElementRef;

  @Output() answer = new EventEmitter<Answer>();
  mode: 'pergunta' | 'resposta' = 'pergunta';

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.textoLivreInputFocus();
  }

  mostrarResposta() {
    this.mode = 'resposta';
  }

  errei() {
    this.answer.emit({
      correct: false,
      card: this.card,
      dateTime: new Date().toISOString(),
    });

    this.textoLivre = "";
  }

  acertei() {
    this.answer.emit({
      correct: true,
      card: this.card,
      dateTime: new Date().toISOString(),
    });

    this.textoLivre = "";
  }

  private textoLivreInputFocus() {
    // foca o input de texto livre
    if(this.textoLivreInput) {
      this.textoLivreInput.nativeElement.focus();
    }
  }

}