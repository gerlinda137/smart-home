import { Component, EventEmitter, inject, Output } from '@angular/core';
import { SidebarHeader } from './sidebar-header/sidebar-header';
import { SidebarFooter } from './sidebar-footer/sidebar-footer';
import { SidebarMenu } from './sidebar-menu/sidebar-menu';
import { AuthStateService } from '../../services/auth-service/auth-state-service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarHeader, SidebarFooter, SidebarMenu, AsyncPipe],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  @Output() toggleSideNav = new EventEmitter<void>();

  isAuthenticated$ = inject(AuthStateService).isAuthenticated$;

  onToggleSideNav() {
    this.toggleSideNav.emit();
  }
}
