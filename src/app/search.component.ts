import { Component, OnInit } from '@angular/core';

import { LOB } from './line-of-business';
import { Status } from './status';
import { UploadFieldService } from './upload-field.service';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  lobs: LOB[];
  selectedLOB: LOB;

  statuses: Status[];
  selectedStatus: Status;

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
        this.selectedLOB = lobs[0];
      }
    });
  }

  onLOBSelect(lob: LOB): void {
    this.selectedLOB = lob;
  }

  getStatuses(): void {
    this.uploadFieldService.getStatuses().then(statuses => {
      this.statuses = statuses;
      if (statuses.length > 0) {
        this.selectedStatus = statuses[0];
      }
    });
  }

  onStatusSelect(status: Status): void {
    this.selectedStatus = status;
  }

}
