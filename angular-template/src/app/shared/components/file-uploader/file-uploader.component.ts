import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Upload, FileToShow, FileSummary } from '../../models/file.models';
@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent implements OnInit {

  mbInBytes = 1048576;

  @Input() multiple = false;
  @Input() name = 'File Upload';
  @Input() maximum: number;
  @Input() image: boolean;
  @Input() video: boolean;
  @Input() zip: boolean;
  @Input() required: boolean;
  @Input() description: string;
  @Input() existingFiles: FileSummary[] = [];
  @Input() maxFileSizeMB = 20;

  @Output() uploadsChanged: EventEmitter<Upload[]> = new EventEmitter();
  @Output() existingFilesChanged: EventEmitter<FileSummary[]> = new EventEmitter();

  uploads: Upload[] = [];

  filesToShow: FileToShow[] = [];

  failureMessage: string;
  failureSubText: string;

  ngOnInit(): any {
    if (this.existingFiles) {
      for (const file of this.existingFiles) {
        const fileToShow = new FileToShow();
        fileToShow.identifier = file.uuid;
        fileToShow.format = file.format;
        fileToShow.url = file.url;
        fileToShow.type = 'existing';
        this.filesToShow.push(fileToShow);
      }
    }
  }

  preview(event): any {
    this.failureMessage = null;
    this.failureSubText = null;

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
        this.failureMessage = 'Invalid file type.';
        this.failureSubText = null;
        return;
      }

      reader.readAsDataURL(file);

      reader.onload = (event2: any) => {

        const result = reader.result;

        if (!result) {
          this.failureMessage = 'Unable to read file.';
          this.failureSubText = null;
          return;
        }

        // @ts-ignore
        if (result.length * 2 > this.mbInBytes * this.maxFileSizeMB) {
          this.failureMessage = `File exceeds the maximum size limit.`;
          // @ts-ignore
          this.failureSubText = `Limit: ${this.maxFileSizeMB}mb. File Size: ${Math.round((result.length * 2) / this.mbInBytes * 100) / 100}mb.`;
          return;
        }
        upload.url = (event2.target as FileReader).result;
        upload.tempId = this.uuidv4();

        const fileToShow = new FileToShow();
        fileToShow.identifier = upload.tempId;
        fileToShow.format = upload.format;
        fileToShow.url = upload.url;
        fileToShow.type = 'new';

        if (this.multiple) {
          this.uploads.push(upload);
          this.filesToShow.push(fileToShow);
        }
        else {
          this.uploads[0] = upload;
          this.filesToShow[0] = fileToShow;
        }

        this.uploadsChanged.emit(this.uploads);
      };
    }
  }

  remove(fileToShow: FileToShow): any {
    if (fileToShow.type === 'new') {
      this.uploads = this.uploads.filter(p => p.tempId !== fileToShow.identifier);
      this.uploadsChanged.emit(this.uploads);
    }

    if (fileToShow.type === 'existing') {
      this.existingFiles = this.existingFiles.filter(p => p.uuid !== fileToShow.identifier);
      this.existingFilesChanged.emit(this.existingFiles);
    }

    this.filesToShow = this.filesToShow.filter(p => p.identifier !== fileToShow.identifier);
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
