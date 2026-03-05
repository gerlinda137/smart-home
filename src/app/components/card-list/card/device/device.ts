import { Component, effect, input, output, signal } from '@angular/core';
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
  device = input.required<DeviceItem>();
  checked = input<boolean>();

  toggleState = signal(false);

  stateChange = output<{ label: string; state: boolean }>();

  constructor() {
    effect(() => {
      const checkedValue = this.checked();
      if (checkedValue !== undefined) {
        this.toggleState.set(checkedValue);
        return;
      }

      const deviceValue = this.device();
      if (deviceValue) {
        this.toggleState.set(deviceValue.state);
      }
    });
  }

  onToggle(checked: boolean) {
    this.toggleState.set(checked);
    this.stateChange.emit({
      label: this.device().label,
      state: checked,
    });
  }
}
