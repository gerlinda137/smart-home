import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardModel, DeviceItem } from '../../../../models/types';
import { Sensor } from './sensor/sensor';
import { Device } from './device/device';
import { NgClass } from '@angular/common';
import { ActiveCardDirective } from '../../../directives/active.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgClass, Sensor, Device, ActiveCardDirective],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) card!: CardModel;
  @Input() layoutClass = '';
  @Input() isActive = false;

  onDeviceStateChange(item: DeviceItem, newState: boolean) {
    item.state = newState;
  }
}
