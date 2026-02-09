import { Component, Input } from '@angular/core';
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
}
