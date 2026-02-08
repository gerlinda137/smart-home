import { Pipe, PipeTransform } from '@angular/core';
import { SensorValue } from '../../models/types';

@Pipe({
  name: 'sensor',
})
export class SensorPipe implements PipeTransform {
  transform(value: SensorValue): string {
    return `${value.amount} ${value.unit}`;
  }
}
