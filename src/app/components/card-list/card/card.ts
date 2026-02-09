import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CardModel } from '../../../../models/types';
import { Sensor } from './sensor/sensor';
import { Device } from './device/device';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgClass, Sensor, Device],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  @Input({ required: true }) card!: CardModel;

  @Input() layoutClass = '';
}
