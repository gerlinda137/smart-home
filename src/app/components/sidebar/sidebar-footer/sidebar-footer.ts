import { Component, inject } from '@angular/core';
import { AuthStateService } from '../../../services/auth-service/auth-state-service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-sidebar-footer',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './sidebar-footer.html',
  styleUrl: './sidebar-footer.scss',
})
export class SidebarFooter {
  userProfile$ = inject(AuthStateService).userProfile$;
}
