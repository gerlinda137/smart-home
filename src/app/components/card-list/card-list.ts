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
}
