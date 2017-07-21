import { HomeService } from './home-service';
import { Item } from './item';
import { LOB } from './line-of-business';
import { UploadFieldService } from './upload-field.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  firstName: String;
  fullName: String;
  announcements: Item[];
  recentUploads: Item[];
  recentSearches: Item[];
  lobs: LOB[];

  constructor(private homeService: HomeService, private uploadFieldService: UploadFieldService ) { }

  ngOnInit(): void {
    this.getFirstName();
    this.getFullName();
    this.getAnnouncements();
    this.getRecentSearches();
    this.getRecentUploads();
    this.getLOBS();
  }

  getFirstName(): void {
    this.homeService.getFirstName().then(firstName => this.firstName = firstName);
  }

  getFullName(): void {
    this.homeService.getFullName().then(fullName => this.fullName = fullName);
  }

  getAnnouncements(): void {
    this.homeService.getAnnouncement().then(announcements => this.announcements = announcements);
  }

  getRecentSearches(): void {
    this.homeService.getRecentSearches().then(recentSearches => this.recentSearches = recentSearches);
  }

  getRecentUploads(): void {
    this.homeService.getRecentUploads().then(recentUploads => this.recentUploads = recentUploads);
  }

  getLOBS(): void {
    this.uploadFieldService.getLOBS().then(lobs => this.lobs = lobs);
  }

  onQSSelect(lob): void {
    alert('Quick Search selected value: ' + lob);
  }

  onULSelect(lob): void {
    alert('Upload Launch selected value: ' + lob);
  }

}
