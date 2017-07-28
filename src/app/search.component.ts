import { Component, OnInit } from '@angular/core';

import { LOB } from './line-of-business';
import { SearchResult } from './searchresult';
import { Status } from './status';
import { UploadFieldService } from './upload-field.service';
import { Http, Response, Headers, RequestOptions, RequestOptionsArgs, ResponseContentType } from '@angular/http';
import { saveAs } from 'file-saver';

const URL = 'http://127.0.0.1:8080/api/search/';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  search_quoteNumber: String = '';
  lobs: LOB[];
  selectedLOB: LOB;

  statuses: Status[];
  selectedStatus: Status;
  searchResult: SearchResult[] = [];

  constructor(private uploadFieldService: UploadFieldService, private http: Http) { }

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

  search(): void {
      const body = 'searchString=' + this.search_quoteNumber;
      const headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(URL,
          body, {
            headers: headers
          })
          .subscribe(data => {
                this.searchResult = [];
                for (let res of data.json()) {
                   let aResult = new SearchResult().fromJSON(res);
                   this.searchResult.push(aResult);
                }
          }, error => {
              console.log(JSON.stringify(error.json()));
          });
  }

  downloadFile(docID: string, fileName: string, docType: string) {
    const body = '_id=' + docID;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.http.post('http://127.0.0.1:8080/api/getfile/',
      body, {
        headers: headers,
        responseType : ResponseContentType.Blob
      })
      .subscribe(data => {
          let mediaType = docType;
          let blob = new Blob([data['_body']], {type: mediaType});
          saveAs(blob, fileName);
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }

  openFileInTab(docID: string, fileName: string, docType: string) {
    const body = '_id=' + docID;
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post('http://127.0.0.1:8080/api/getfile/',
      body, {
        headers: headers,
        responseType : ResponseContentType.Blob
      })
      .subscribe(data => {
          let blob = new Blob([data['_body']], {type: docType});
          let fileURL = window.URL.createObjectURL(blob);
          window.open(fileURL);
      }, error => {
          console.log(JSON.stringify(error.json()));
      });
  }
}
