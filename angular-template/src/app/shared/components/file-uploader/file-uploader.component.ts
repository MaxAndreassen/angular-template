import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Upload } from '../../models/file.models';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Input() multiple = false;
  @Input() name = 'File Upload';
  @Input() maximum: number;
  @Input() image: boolean;
  @Input() video: boolean;
  @Input() zip: boolean;
  @Input() description: string;
  @Output() uploadsChanged: EventEmitter<Upload[]> = new EventEmitter();

  uploads: Upload[] = [];

  failureMessage: string;

  preview(event): any {
    this.failureMessage = null;

    if (!!this.maximum && this.uploads.length >= this.maximum) {
      return;
    }

    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      const upload = new Upload();
      upload.file = file;

      if (file.type.indexOf('image') > -1 && this.image) {
        upload.format = 'image';
      } else if (file.type.indexOf('video') > -1 && this.video) {
        upload.format = 'video';
      } else if (file.type.indexOf('zip') > -1 && this.zip) {
        upload.format = 'zip';
      }

      if (!upload.format) {
        this.failureMessage = 'Invalid File Type.';
        return;
      }

      reader.readAsDataURL(file);

      reader.onload = (event2: any) => {
        upload.url = (event2.target as FileReader).result;
        upload.tempId = this.uuidv4();
        if (this.multiple) {
          this.uploads.push(upload);
        }
        else {
          this.uploads[0] = upload;
        }

        this.uploadsChanged.emit(this.uploads);
      };
    }
  }

  remove(tempId: string): any {
    this.uploads = this.uploads.filter(p => p.tempId !== tempId);
  }

  uuidv4(): any {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      /* tslint:disable */
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      /* tslint:enable */
      return v.toString(16);
    });
  }
}
