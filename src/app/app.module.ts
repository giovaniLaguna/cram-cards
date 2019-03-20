import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { DataService } from './data.service';
import { CardManagerService } from './card-manager.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent, CardComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataService, CardManagerService]
})
export class AppModule { }
