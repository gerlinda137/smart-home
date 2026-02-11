import { Component, input } from '@angular/core';
import { Card } from './card/card';
import { CardModel } from '../../../models/types';
import { ActiveCardDirective } from '../../directives/active.directive';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [Card, ActiveCardDirective],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards = input.required<CardModel[]>();

  isCardActive(card: CardModel): boolean {
    return card.items.some((item) => item.type === 'device' && item.state === true);
  }

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
