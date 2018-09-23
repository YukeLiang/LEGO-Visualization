import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GoogleSheetService } from './shared/google-sheet.service';
import { StacksComponent } from '../app/stacks/stacks.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    StacksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [GoogleSheetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
