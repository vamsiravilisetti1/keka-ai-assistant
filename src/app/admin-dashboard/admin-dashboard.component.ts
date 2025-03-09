import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatBotService } from '../chat-bot/chatbot-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  pdfUploadForm: FormGroup;
  isUploading = false;
  selectedFileName: string | null = null;

  constructor(private fb: FormBuilder, private chatBotService: ChatBotService, private snackBar: MatSnackBar) {
    this.pdfUploadForm = this.fb.group({
      file: [null, Validators.required]
    });
  }

  // File selection via input
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.pdfUploadForm.patchValue({ file });
    }
  }

  // Drag & drop support
  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onFileDropped(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.pdfUploadForm.patchValue({ file });
    }
  }

  // Upload file API call
  uploadFile() {
    if (this.pdfUploadForm.valid) {
      this.isUploading = true;
      const file = this.pdfUploadForm.get('file')?.value;

      this.chatBotService.uploadDocument(file).subscribe({
        next: () => {
          this.isUploading = false;
          this.selectedFileName = null;
          this.snackBar.open('File uploaded successfully!', 'Close', { duration: 3000, panelClass: 'success-snackbar' });
        },
        error: (err) => {
          this.isUploading = false;
          console.error('Upload failed:', err);
          this.snackBar.open('File upload failed! Please try again.', 'Close', { duration: 3000, panelClass: 'error-snackbar' });
        }
      });
    }
  }
}
