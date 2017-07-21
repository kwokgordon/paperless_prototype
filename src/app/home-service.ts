
import { Item } from './item';
import { Injectable } from '@angular/core';
import { FirstName, fullName, Announcements, RecentSearches, RecentUploads } from './mock-home-data';

@Injectable()
export class HomeService {

  getFirstName(): Promise<String> {
    return Promise.resolve(FirstName);
  }

  getFullName(): Promise<String> {
    return Promise.resolve(fullName);
  }

  getAnnouncement(): Promise<Item[]> {
    return Promise.resolve(Announcements);
  }

  getRecentSearches(): Promise<Item[]> {
    return Promise.resolve(RecentSearches);
  }

  getRecentUploads(): Promise<Item[]> {
    return Promise.resolve(RecentUploads);
  }

}
