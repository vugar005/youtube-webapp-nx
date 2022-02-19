import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareVideoDialogComponent } from './share-video-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { ReactiveFormsModule } from '@angular/forms';
import { SecondsToTimeModule } from '../pipes';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ShareVideoDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    ClipboardModule,
    SecondsToTimeModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class ShareVideoDialogModule {}
