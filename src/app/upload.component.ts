import { Component, OnInit } from '@angular/core';

import { LOB } from './line-of-business';
import { Status } from './status';
import { UploadFieldService } from './upload-field.service';
import { FileUploader } from 'ng2-file-upload';
import { FileUploaderExtend } from './fileuploaderextend';
import { NewUpload } from './newupload';

const URL = 'http://127.0.0.1:8080/api/new/';
// const URL = 'https://requestb.in/1hz3jfk1';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements OnInit {
  fileDescription = 'Drop your file here';
  lobs: LOB[];
  newUploadObj: NewUpload = new NewUpload();

  statuses: Status[];

  // uploader: FileUploaderExtend;
  uploader: FileUploader =  new FileUploader ({url: URL});
  hasBaseDropZoneOver: Boolean = false;
  hasAnotherDropZoneOver: Boolean = false;

  constructor(private uploadFieldService: UploadFieldService) { }

  ngOnInit(): void {
    this.getLOBS();
    this.getStatuses();
    // this.uploader = new FileUploaderExtend ({url: URL});
  }

  getLOBS(): void {
    this.uploadFieldService.getLOBS().then(lobs => {
      this.lobs = lobs;
      if (lobs.length > 0) {
        this.newUploadObj.lob = lobs[0];
      }
    });
  }

  getStatuses(): void {
    this.uploadFieldService.getStatuses().then(statuses => {
      this.statuses = statuses;
      if (statuses.length > 0) {
        this.newUploadObj.status = statuses[0];
      }
    });
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  ngAfterViewInit(): void {
    this.uploader.onAfterAddingFile = (item => {
        item.withCredentials = false;
     });
  }

  uploadAll(): void {
    this.prepareUploadData();
    // this.uploader.uploadAllFiles();
    this.uploader.uploadAll();
  }

  prepareUploadData(): void {
    this.uploader.onBuildItemForm = (item, form) => {
      if (this.newUploadObj != null ) {
        form.append('uploadData', JSON.stringify(this.newUploadObj));
        form.append('uploadTimeInMilli', new Date().getTime());
      }
    };
  }

  oneFileOnly(event): void {
    if (this.uploader.queue.length > 1) {
       for (const item of this.uploader.queue) {
        if (this.uploader.queue.length > 1) {
          item.remove();
        }
      }
    }
    if (this.uploader.queue.length === 1) {
      this.fileDescription = 'file: ' + this.uploader.queue[0].file.name;
    }
  }

}
