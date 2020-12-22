import { Component, OnInit, Input } from '@angular/core';
import { FileSummary } from '../../models/file.models';
import { faBook, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-file-gallery',
  templateUrl: './file-gallery.component.html',
  styleUrls: ['./file-gallery.component.scss']
})
export class FileGalleryComponent implements OnInit {
  @Input() files: FileSummary[] = [];

  selectedFile: FileSummary = new FileSummary();

  leftIcon = faArrowLeft;
  rightIcon = faArrowRight;

  constructor() { }

  ngOnInit(): any {
    this.selectedFile = this.files[0];
  }

  select(file: FileSummary): any {
    this.selectedFile = file;
  }

  left(): any {
    const currentIndex = this.files.indexOf(this.selectedFile);

    const newIndex = currentIndex === 0 ? this.files.length - 1 : currentIndex - 1;

    this.selectedFile = this.files[newIndex];
  }

  right(): any {
    const currentIndex = this.files.indexOf(this.selectedFile);

    const newIndex = currentIndex === this.files.length - 1 ? 0 : currentIndex + 1;

    this.selectedFile = this.files[newIndex];
  }
}
