import { Component, EventEmitter, Output } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeader, SidebarFooter, SidebarMenu],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() toggleSideNav = new EventEmitter<void>();

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
}
