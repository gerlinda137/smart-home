import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SensorItem } from '../../../../../models/types';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './sensor.html',
  styleUrl: './sensor.scss',
})
export class Sensor {
  @Input({ required: true }) sensor!: SensorItem;
}
