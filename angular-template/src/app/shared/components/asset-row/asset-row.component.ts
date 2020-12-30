import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { AssetContent } from '../../models/product.models.ts';
import { faFolder, faArrowUp, faArrowDown, faFile, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { FileSizeHelperService } from '../../services/file-size-helper/file-size-helper.service';

@Component({
  selector: 'app-asset-row',
  templateUrl: './asset-row.component.html',
  styleUrls: ['./asset-row.component.scss']
})
export class AssetRowComponent implements OnChanges {

  folderIcon = faFolder;
  fileIcon = faFileAlt;
  openIcon = faArrowUp;
  closeIcon = faArrowDown;
  open = true;

  @Input() rows: AssetContent[] = [];
  @Input() depth = 0;

  constructor(private fileSizeHelper: FileSizeHelperService) {

  }

  ngOnChanges(): any {
    if (!this.rows) {
      return;
    }

    this.rows.forEach(row => {
      row.fileSizeFriendly = this.fileSizeHelper.getFileSize(row.fileSize);
    });
  }

  toggleOpen(row: AssetContent): any {
    row.open = !row.open;
  }

}
