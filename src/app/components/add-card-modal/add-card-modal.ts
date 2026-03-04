import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CardLayout } from '../../../models/types';

@Component({
  selector: 'app-add-card-model',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-card-modal.html',
  styleUrl: './add-card-modal.scss',
})
export class AddCardModal {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddCardModal>);

  layouts: CardLayout[] = ['horizontalLayout', 'verticalLayout', 'singleDevice'];

  cardForm = this.fb.group({
    layout: ['verticalLayout' as CardLayout, Validators.required],
  });

  onSubmit() {
    if (this.cardForm.invalid) return;

    const layout = this.cardForm.value.layout;

    this.dialogRef.close({
      layout: layout,
    });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
