import { FileUploader, FileItem, FileUploaderOptions } from 'ng2-file-upload';

export class FileUploaderExtend extends FileUploader {

   xhr: XMLHttpRequest = new XMLHttpRequest();
   sendable: FormData = new FormData();
   fakeitem: FileItem = null;

   constructor(options: FileUploaderOptions) {
      super(options);
    }

  uploadAllFiles(): void {

    this.onBuildItemForm(this.fakeitem, this.sendable);

    for (const item of this.queue) {
      item.isReady = true;
      item.isUploading = true;
      item.isUploaded = false;
      item.isSuccess = false;
      item.isCancel = false;
      item.isError = false;
      item.progress = 0;

      if (typeof item._file.size !== 'number') {
        throw new TypeError('The file specified is no longer valid');
      }
      this.sendable.append('files', item._file, item.file.name);
    }

    if (this.options.additionalParameter !== undefined) {
      Object.keys(this.options.additionalParameter).forEach((key) => {
        this.sendable.append(key, this.options.additionalParameter[key]);
      });
    }

    this.xhr.onload = () => {
      const gist = (this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status === 304 ? 'Success' : 'Error';
      const method = 'on' + gist + 'Item';
      this[method](this.fakeitem, null, this.xhr.status, null);

    };
    this.xhr.onerror = () => {
      this.onErrorItem(this.fakeitem, null, this.xhr.status, null);
    };

    this.xhr.onabort = () => {
      this.onErrorItem(this.fakeitem, null, this.xhr.status, null);
    };

    this.xhr.open('POST', this.options.url, true);
    this.xhr.withCredentials = false;
    if (this.options.headers) {
      for (let _i = 0, _a = this.options.headers; _i < _a.length; _i++) {
        const header = _a[_i];
        this.xhr.setRequestHeader(header.name, header.value);
      }
    }
    if (this.authToken) {
      this.xhr.setRequestHeader(this.authTokenHeader, this.authToken);
    }
    this.xhr.send(this.sendable);
  }

}
