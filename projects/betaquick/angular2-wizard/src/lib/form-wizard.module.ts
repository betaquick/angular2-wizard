import {ModuleWithProviders, NgModule} from '@angular/core';
import {WizardComponent} from './wizard.component';
import {WizardStepComponent} from './wizard-step.component';
import {CommonModule} from '@angular/common';

import { AccordionModule } from 'ngx-bootstrap/accordion';


@NgModule({
  declarations: [
    WizardComponent,
    WizardStepComponent
  ],
  imports: [
    CommonModule,
    AccordionModule.forRoot()
  ],
  exports: [
    WizardComponent,
    WizardStepComponent
  ]
})
export class FormWizardModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FormWizardModule
    };
  }
}
