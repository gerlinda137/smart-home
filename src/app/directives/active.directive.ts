import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appActiveCard]',
  standalone: true,
})
export class ActiveCardDirective {
  @Input() appActiveCard = false;
  @HostBinding('class.card--active')
  get isActive() {
    return this.appActiveCard;
  }
}
