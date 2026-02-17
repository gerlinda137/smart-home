// dashboard-page.ts
import { Component, computed, signal, ViewChild, OnInit } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Dashboard } from '../../dashboard/dashboard';
import { Sidebar } from '../../sidebar/sidebar';

@Component({
  selector: 'app-dashboard-page',
  imports: [Sidebar, Dashboard, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard-page.html',
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile = signal(window.matchMedia('(max-width: 1024px)').matches);
  isOpen = signal(false);
  sidenavMode = computed<'side' | 'over'>(() => (this.isMobile() ? 'over' : 'side'));
  sidenavOpened = computed(() => (this.isMobile() ? this.isOpen() : true));

  private mediaQuery = window.matchMedia('(max-width: 1024px)');

  private onResize = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);
    this.isOpen.set(false);
  };

  ngOnInit() {
    this.isMobile.set(this.mediaQuery.matches);
    this.isOpen.set(false);
    this.mediaQuery.addEventListener('change', this.onResize);
  }

  toggleSideNav() {
    if (!this.isMobile()) return;
    this.isOpen.update((v) => !v);
  }

  closeSidebar() {
    if (!this.isMobile()) return;
    this.isOpen.set(false);
  }
}
