import { Component, computed, signal, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';
import { Dashboard } from './components/dashboard/dashboard';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Sidebar,
    Dashboard,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  protected readonly title = signal('smart-home');
  isMobile = signal(window.matchMedia('(max-width: 1024px)').matches);
  isOpen = signal(false);
  //on desktop part of the layout on mobile over
  sidenavMode = computed<'side' | 'over'>(() => (this.isMobile() ? 'over' : 'side'));
  sidenavOpened = computed(() => (this.isMobile() ? this.isOpen() : true));

  private mediaQuery = window.matchMedia('(max-width: 1024px)');

  private onResize = (event: MediaQueryListEvent) => {
    this.isMobile.set(event.matches);

    if (event.matches) {
      this.isOpen.set(false);
    } else {
      this.isOpen.set(false);
    }
  };

  ngOnInit() {
    this.isMobile.set(this.mediaQuery.matches);
    if (this.mediaQuery.matches) {
      this.isOpen.set(false);
    }
    this.mediaQuery.addEventListener('change', this.onResize);
  }

  toggleSidebar() {
    if (!this.isMobile()) return;
    this.isOpen.update((v) => !v);
  }

  closeSidebar() {
    if (!this.isMobile()) return;
    this.isOpen.set(false);
  }

  toggleSideNav() {
    if (!this.isMobile()) return;
    this.isOpen.update((v) => !v);
  }
}
