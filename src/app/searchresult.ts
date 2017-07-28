import { LOB } from './line-of-business';
import { Status } from './status';


export class SearchResult {
  _id: string;
  lob: LOB;
  status: Status;
  quoteNumber: string;
  files: object;
  createdDate: Date;

  fromJSON(json): SearchResult {
    for (let propName in json) {
      if (propName === '_id') {
        this[propName] = json[propName].$oid;
      } else if (propName === 'createdDate') {
        this[propName] = new Date(json[propName].$date);
      } else {
        this[propName] = json[propName];
      }
    }
    return this;
  }
}
