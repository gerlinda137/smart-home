import { Component, effect, Input, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DeviceItem } from '../../../../../models/types';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [MatIcon, MatSlideToggleModule],
  templateUrl: './device.html',
  styleUrl: './device.scss',
})
export class Device {
  @Input({ required: true }) device!: DeviceItem;
  toggleState = signal(false);

  constructor() {
    effect(() => {
      if (this.device) {
        this.toggleState.set(this.device.state);
      }
    });
  }

  onToggle(checked: boolean) {
    this.toggleState.set(checked);
  }
}
