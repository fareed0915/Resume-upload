import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DriveService } from './drive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(
    private http: HttpClient, 
    private driveService: DriveService
  ) {}

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    // If you want to upload to your server
    this.uploadToServer(file);

    // If you want to upload to Google Drive
    this.uploadToGoogleDrive(file);
  }

  private uploadToServer(file: File): void {
    const formData = new FormData();
    formData.append('resume', file, file.name);

    this.http.post('/api/upload', formData).subscribe(
      response => {
        console.log('Upload to server successful', response);
      },
      error => {
        console.error('Upload to server failed', error);
      }
    );
  }

  private uploadToGoogleDrive(file: File): void {
    this.driveService.uploadFile(file)
      .then(response => {
        console.log('File uploaded to Google Drive successfully', response);
      })
      .catch(error => {
        console.error('Error uploading file to Google Drive', error);
      });
  }
}
