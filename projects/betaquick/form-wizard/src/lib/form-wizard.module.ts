import {NgModule} from '@angular/core';
import {WizardStepComponent} from './wizard-step.component';
import {WizardComponent} from './wizard.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    WizardStepComponent,
    WizardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WizardStepComponent,
    WizardComponent
  ]
})
export class FormWizardModule {
}
