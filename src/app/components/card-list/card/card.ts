import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardModel } from '../../../../models/types';

@Component({
  selector: 'app-card',
  imports: [MatCardModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) card!: CardModel;
}
