import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardModel } from '../../../../models/types';
import { Sensor } from './sensor/sensor';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, Sensor],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) card!: CardModel;

  protected get layoutClass(): string {
    switch (this.card.layout) {
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
