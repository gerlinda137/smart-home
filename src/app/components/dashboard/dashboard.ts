import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  Signal,
  signal,
} from '@angular/core';
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
  @Input() dashboard!: DashboardData;
  @Input() currentTab?: Tab;
  @Input() isEditMode$!: Signal<boolean>;

  @Output() tabSelected = new EventEmitter<string>();
  isAddingTab = signal(false);
  private store = inject(Store);

  selectedIndex = 0;

  ngOnChanges() {
    if (this.dashboard && this.currentTab) {
      this.selectedIndex = this.dashboard.tabs.findIndex((t) => t.id === this.currentTab!.id);
    } else {
      this.selectedIndex = 0;
    }
  }

  showAddTabForm() {
    this.isAddingTab.set(true);
  }

  onTabChange(index: number): void {
    this.tabSelected.emit(this.dashboard.tabs[index].id);
  }

  cancelAddTab() {
    this.isAddingTab.set(false);
  }

  addTab(title: string) {
    if (!title || !title.trim()) return;
    this.store.dispatch(DashboardActions.addTab({ title: title.trim() }));
    this.isAddingTab.set(false);
  }
}
