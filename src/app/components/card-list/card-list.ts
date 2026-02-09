import { Component } from '@angular/core';
import { Card } from './card/card';
import { CardModel } from '../../../models/types';
import { DASHBOARD_MOCK } from '../../../mock-data/dashboard.mock';

@Component({
  selector: 'app-card-list',
  imports: [Card],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  protected readonly cards: CardModel[] =
    DASHBOARD_MOCK.tabs.find((tab) => tab.id === 'overview')?.cards ?? [];

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
