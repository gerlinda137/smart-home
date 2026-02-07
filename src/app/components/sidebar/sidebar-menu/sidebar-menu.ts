import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {}
