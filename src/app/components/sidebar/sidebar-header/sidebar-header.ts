import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar-header',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './sidebar-header.html',
  styleUrl: './sidebar-header.scss',
})
export class SidebarHeader {}
