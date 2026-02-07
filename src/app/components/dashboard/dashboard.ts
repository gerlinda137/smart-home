import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { CardList } from '../card-list/card-list';

@Component({
  selector: 'app-dashboard',
  imports: [MatTabsModule, CardList],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {}
