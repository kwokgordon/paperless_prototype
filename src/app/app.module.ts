import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { SearchComponent } from './search.component';
import { UploadComponent } from './upload.component';

import { UploadFieldService } from './upload-field.service';

import { AppRoutingModule } from './app-routing.module';
import { HomeService } from './home-service';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpModule } from '@angular/http';
import { saveAs } from 'file-saver';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FileUploadModule,
    HttpModule
  ],
  providers: [UploadFieldService, HomeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
