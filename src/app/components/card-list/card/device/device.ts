import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
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
export class Device implements OnChanges {
  @Input({ required: true }) device!: DeviceItem;
  toggleState = signal(false);

  @Output() stateChange = new EventEmitter<boolean>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['device'] && this.device) {
      this.toggleState.set(this.device.state);
    }
  }

  onToggle(checked: boolean) {
    this.toggleState.set(checked);
    this.stateChange.emit(checked);
  }
}
