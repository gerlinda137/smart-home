import { Component, computed, Input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardModel, DeviceItem } from '../../../../models/types';
import { Sensor } from './sensor/sensor';
import { Device } from './device/device';
import { NgClass } from '@angular/common';
import { ActiveCardDirective } from '../../../directives/active.directive';
import { MatSlideToggle, MatSlideToggleChange } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatSlideToggle, NgClass, Sensor, Device, ActiveCardDirective],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) card!: CardModel;
  @Input() layoutClass = '';
  @Input() isActive = false;

  private uiState = signal<Record<string, boolean>>({});

  private devices(): DeviceItem[] {
    return this.card.items.filter((i) => i.type === 'device') as DeviceItem[];
  }

  showGroupToggle = computed(() => this.devices().length >= 2);

  groupChecked = computed(() => this.devices().some((d) => d.state === true));

  onDeviceStateChange(item: DeviceItem, newState: boolean) {
    item.state = newState;
  }

  onGroupToggle(e: MatSlideToggleChange) {
    const checked = e.checked;
    for (const d of this.devices()) {
      d.state = checked;
    }
  }
}
