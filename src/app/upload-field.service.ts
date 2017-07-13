import { LOB } from './line-of-business'
import { Status } from './status'
import { LOBS, Statuses } from './mock-upload-fields';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadFieldService {
  getLOBS(): Promise<LOB[]> {
    return Promise.resolve(LOBS);
  }

  getStatuses(): Promise<Status[]> {
    return Promise.resolve(Statuses);
  }
}
