import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { CardItem, CardModel } from '../../../models/types';
import { DeviceService } from '../../services/device-service/device-service';

@Component({
  selector: 'app-edit-card-modal',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './edit-card-modal.html',
  styleUrl: './edit-card-modal.scss',
})
export class EditCardModal implements OnInit {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditCardModal>);
  private data = inject<{ card: CardModel }>(MAT_DIALOG_DATA);
  private deviceService = inject(DeviceService);

  availableDevices = signal<CardItem[]>([]);

  currentItems = signal<CardItem[]>([...this.data.card.items]);

  cardForm = this.fb.group({
    title: [this.data.card.title || ''],
  });

  ngOnInit() {
    this.deviceService.getDevices().subscribe({
      next: (devices) => {
        this.availableDevices.set(devices);
      },
      error: (err) => {
        console.error('Failed to load devices:', err);
      },
    });
  }

  addDevice(device: CardItem) {
    const updated = [...this.currentItems(), device];
    this.currentItems.set(updated);
  }

  removeDevice(index: number) {
    const updated = this.currentItems().filter((item, i) => i !== index);
    this.currentItems.set(updated);
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSave() {
    const title = this.cardForm.value.title || '';

    this.dialogRef.close({
      title: title,
      items: this.currentItems(),
    });
  }
}
