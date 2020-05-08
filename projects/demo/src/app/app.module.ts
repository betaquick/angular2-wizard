import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {FormWizardModule} from '../../../betaquick/form-wizard/src/lib/form-wizard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormWizardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
