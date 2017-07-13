import { Component, OnInit } from '@angular/core';

import { LOB } from './line-of-business'
import { Status } from './status'
import { UploadFieldService } from './upload-field.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  lobs: LOB[];
  selectedLOB: LOB;

  statuses: Status[];
  selectedStatus: Status;

  constructor(private uploadFieldService: UploadFieldService) { }

  ngOnInit(): void {
    this.getLOBS();
    this.getStatuses();
  }

  getLOBS(): void {
    this.uploadFieldService.getLOBS().then(lobs => this.lobs = lobs);
  }

  onLOBSelect(lob: LOB): void {
    this.selectedLOB = lob;
  }

  getStatuses(): void {
    this.uploadFieldService.getStatuses().then(statuses => this.statuses = statuses);
  }

  onStatusSelect(status: Status): void {
    this.selectedStatus = status;
  }

}
