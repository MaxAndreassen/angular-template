import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSizeHelperService {

  constructor() { }

  getFileSize(bytes: number): string {
    if (bytes < 100) {
      return `${Math.round(bytes * 100) / 100} B`;
    }

    const kiloBytes = bytes / 1024;

    if (kiloBytes < 100) {
      return `${Math.round(kiloBytes * 100) / 100} KB`;
    }

    const megaBytes = kiloBytes / 1024;

    if (megaBytes < 100) {
      return `${Math.round(megaBytes * 100) / 100} MB`;
    }

    const gigaBytes = megaBytes / 1024;

    if (gigaBytes < 100) {
      return `${Math.round(gigaBytes * 100) / 100} GB`;
    }

    const terraBytes = gigaBytes / 1024;

    return `${Math.round(terraBytes * 100) / 100} TB`;
  }
}
