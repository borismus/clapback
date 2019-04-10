import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {
  MatButtonModule,
  MatDividerModule,
  MatSlideToggleModule
} from '@angular/material';


import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RhythmComponent} from './rhythm.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    RhythmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatSlideToggleModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
