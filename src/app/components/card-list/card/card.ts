import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CardModel, DeviceItem } from '../../../../models/types';
import { Sensor } from './sensor/sensor';
import { Device } from './device/device';
import { ActiveCardDirective } from '../../../directives/active.directive';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../../store/dashboard/dashboard.actions';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatSlideToggle, Sensor, Device, ActiveCardDirective, MatIcon],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  card = input.required<CardModel>();
  layoutClass = input<string>('');
  isActive = input<boolean>(false);
  isEditMode = input<boolean>(false);
  private store = inject(Store);

  private devices(): DeviceItem[] {
    return this.card().items.filter((i) => i.type === 'device') as DeviceItem[];
  }

  showGroupToggle = computed(() => this.devices().length >= 2);

  groupChecked = computed(() => this.devices().some((d) => d.state === true));

  onDeviceStateChange(item: DeviceItem, event: { label: string; state: boolean }) {
    const deviceId = item.id;
    const newState = event.state;

    this.store.dispatch(
      DashboardActions.toggleDeviceState({
        deviceId: deviceId,
        newState: newState,
      }),
    );
  }

  onGroupToggle(e: MatSlideToggleChange) {
    const checked = e.checked;
    for (const d of this.devices()) {
      this.store.dispatch(DashboardActions.toggleDeviceState({ deviceId: d.id, newState: checked }));
    }
  }
}
