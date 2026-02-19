import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TokenStorageService } from '../../../services/token-storage/token-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  userProfile$ = inject(AuthStateService).userProfile$;
  authService = inject(AuthStateService);
  tokenStorage = inject(TokenStorageService);
  router = inject(Router);

  logout() {
    this.authService.setAuthenticated(false);
    this.tokenStorage.clearToken();
    this.router.navigate(['/login']);
  }
}
