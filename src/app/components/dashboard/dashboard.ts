import { Component, inject, input, OnChanges, output, Signal, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { DashboardData, Tab } from '../../../models/types';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { MatDialog } from '@angular/material/dialog';
import { AddCardModal } from '../add-card-modal/add-card-modal';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatTabsModule,
    CardList,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnChanges {
  dashboard = input.required<DashboardData>();
  currentTab = input<Tab>();
  isEditMode$ = input.required<Signal<boolean>>();

  tabSelected = output<string>();
  isAddingTab = signal(false);
  editingTabId = signal<string | null>(null);
  private store = inject(Store);
  private dialog = inject(MatDialog);

  selectedIndex = 0;

  ngOnChanges() {
    if (this.dashboard() && this.currentTab()) {
      this.selectedIndex = this.dashboard().tabs.findIndex((t) => t.id === this.currentTab()!.id);
    } else {
      this.selectedIndex = 0;
    }
  }

  showAddTabForm() {
    this.isAddingTab.set(true);
  }

  onTabChange(index: number): void {
    this.tabSelected.emit(this.dashboard().tabs[index].id);
  }

  cancelAddTab() {
    this.isAddingTab.set(false);
  }

  addTab(title: string) {
    if (!title || !title.trim()) return;
    this.store.dispatch(DashboardActions.addTab({ title: title.trim() }));
    this.isAddingTab.set(false);
  }

  removeTab(tabId: string) {
    this.store.dispatch(DashboardActions.removeTab({ tabId }));
  }

  startEditTab(tabId: string) {
    this.editingTabId.set(tabId);
  }

  cancelEditTab() {
    this.editingTabId.set(null);
  }

  saveTabTitle(tabId: string, newTitle: string) {
    if (!newTitle || !newTitle.trim()) {
      this.editingTabId.set(null);
      return;
    }

    this.store.dispatch(
      DashboardActions.editTabTitle({
        tabId,
        newTitle: newTitle.trim(),
      }),
    );

    this.editingTabId.set(null);
  }

  moveTabLeft(tabId: string) {
    this.store.dispatch(DashboardActions.moveTabLeft({ tabId }));
  }

  moveTabRight(tabId: string) {
    this.store.dispatch(DashboardActions.moveTabRight({ tabId }));
  }

  openAddCardModal(tabId: string) {
    const dialogRef = this.dialog.open(AddCardModal);

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.layout) {
        const cardId = 'card-' + Date.now();
        const newCard = {
          id: cardId,
          title: '',
          layout: result.layout,
          items: [],
        };

        this.store.dispatch(
          DashboardActions.addCard({
            tabId: tabId,
            card: newCard,
          }),
        );
      }
    });
  }

  onRemoveCard(event: { tabId: string; cardId: string }) {
    this.store.dispatch(
      DashboardActions.removeCard({
        tabId: event.tabId,
        cardId: event.cardId,
      }),
    );
  }
}
