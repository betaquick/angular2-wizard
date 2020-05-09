import * as $ from 'jquery';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormWizardModule} from '../../../betaquick/angular2-wizard/src/lib/form-wizard.module';
import {AccordionModule} from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormWizardModule.forRoot(),
    BrowserAnimationsModule,
    AccordionModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
