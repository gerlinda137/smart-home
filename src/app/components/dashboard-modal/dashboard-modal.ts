import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import * as DashboardActions from '../../store/dashboard/dashboard.actions';
import { of, map, catchError } from 'rxjs';
import { DashboardService } from '../../services/dashboard-service/dashboard-service';

@Component({
  selector: 'app-dashboard-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './dashboard-modal.html',
  styleUrl: './dashboard-modal.scss',
})
export class DashboardModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<DashboardModal>);
  private store = inject(Store);
  private dashboardService = inject(DashboardService);

  dashboardForm = this.fb.group({
    id: ['', [Validators.required, Validators.maxLength(30)], this.uniqueIdValidator.bind(this)],
    title: ['', [Validators.required, Validators.maxLength(50)]],
    icon: ['', Validators.required],
  });

  uniqueIdValidator(control: AbstractControl) {
    if (!control.value) {
      return of(null);
    }

    return this.dashboardService.getDashboards().pipe(
      map((dashboards) => {
        const exists = dashboards.some((d) => d.id === control.value);
        return exists ? { uniqueId: true } : null;
      }),
      catchError(() => of(null)),
    );
  }

  get id() {
    return this.dashboardForm.get('id');
  }

  get title() {
    return this.dashboardForm.get('title');
  }

  get icon() {
    return this.dashboardForm.get('icon');
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.dashboardForm.invalid) return;
    const { id, title, icon } = this.dashboardForm.value;

    this.store.dispatch(
      DashboardActions.createDashboard({
        id: id!,
        title: title!,
        icon: icon!,
      }),
    );
    this.dialogRef.close();
  }
}
