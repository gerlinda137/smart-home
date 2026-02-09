import { Component, input } from '@angular/core';
import { Card } from './card/card';
import { CardModel } from '../../../models/types';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards = input.required<CardModel[]>();

  layoutClass(card: CardModel): string {
    switch (card.layout) {
      case 'horizontalLayout':
        return 'card__horizontal';
      case 'verticalLayout':
        return 'card__vertical';
      case 'singleDevice':
        return 'card__single-device';
      default:
        return '';
    }
  }
}
