import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
export class Dashboard implements OnChanges {
  @Input() dashboard!: DashboardData;
  @Input() currentTab?: Tab;

  @Output() tabSelected = new EventEmitter<string>();

  selectedIndex = 0;

  // get selectedIndex(): number {
  //   return this.dashboard.tabs.findIndex((t) => t.id === this.currentTab.id);
  // }

  // getCurrentTabIndex(): number {
  //   return this.dashboard.tabs.findIndex((t) => t.id === this.currentTab.id);
  // }

  ngOnChanges() {
    if (this.dashboard && this.currentTab) {
      this.selectedIndex = this.dashboard.tabs.findIndex((t) => t.id === this.currentTab!.id);
    } else {
      this.selectedIndex = 0;
    }
  }

  onTabChange(index: number): void {
    this.tabSelected.emit(this.dashboard.tabs[index].id);
  }
}
