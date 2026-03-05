import { Component, inject, input, output } from '@angular/core';
import { Card } from './card/card';
import { CardItem, CardModel } from '../../../models/types';
import { MatIcon } from '@angular/material/icon';
import { EditCardModal } from '../edit-card-modal/edit-card-modal';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [Card, MatIcon],
  templateUrl: './card-list.html',
  styleUrl: './card-list.scss',
})
export class CardList {
  cards = input.required<CardModel[]>();
  isEditMode = input<boolean>(false);
  tabId = input.required<string>();
  private dialog = inject(MatDialog);

  removeCard = output<{ tabId: string; cardId: string }>();
  editCard = output<{ tabId: string; cardId: string; title: string; items: CardItem[] }>();
  reorderCard = output<{ tabId: string; cardId: string; newIndex: number }>();

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

  onRemoveCard(cardId: string) {
    this.removeCard.emit({
      tabId: this.tabId(),
      cardId: cardId,
    });
  }

  onEditCard(card: CardModel) {
    const dialogRef = this.dialog.open(EditCardModal, {
      data: { card },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.editCard.emit({
          tabId: this.tabId(),
          cardId: card.id,
          title: result.title,
          items: result.items,
        });
      }
    });
  }

  moveCardUp(cardId: string, currentIndex: number) {
    if (currentIndex === 0) return;

    const newIndex = currentIndex - 1;
    this.reorderCard.emit({
      tabId: this.tabId(),
      cardId: cardId,
      newIndex: newIndex,
    });
  }

  moveCardDown(cardId: string, currentIndex: number) {
    if (currentIndex === this.cards().length - 1) return;

    const newIndex = currentIndex + 1;
    this.reorderCard.emit({
      tabId: this.tabId(),
      cardId: cardId,
      newIndex: newIndex,
    });
  }
}
