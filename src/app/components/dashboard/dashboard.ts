import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { DashboardData, Tab } from '../../../models/types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatTabsModule, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  @Input() dashboard!: DashboardData;
  @Input() currentTab!: Tab;

  @Output() tabSelected = new EventEmitter<string>();

  get selectedIndex(): number {
    return this.dashboard.tabs.findIndex((t) => t.id === this.currentTab.id);
  }

  // getCurrentTabIndex(): number {
  //   return this.dashboard.tabs.findIndex((t) => t.id === this.currentTab.id);
  // }

  onTabChange(index: number): void {
    this.tabSelected.emit(this.dashboard.tabs[index].id);
  }
}
