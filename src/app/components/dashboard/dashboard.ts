import { Component, computed, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';
import { TabId } from '../../../models/types';
import { DASHBOARD_MOCK } from '../../../mock-data/dashboard.mock';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  activeTabId = signal<TabId>('overview');

  cards = computed(() => {
    const tabId = this.activeTabId();
    const tab = DASHBOARD_MOCK.tabs.find((t) => t.id === tabId);
    return tab?.cards ?? [];
  });

  onTabChange(index: number) {
    const tabId: TabId = index === 0 ? 'overview' : 'lights';

    this.activeTabId.set(tabId);
  }
}
