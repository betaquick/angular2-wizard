import {NgModule} from '@angular/core';
import {WizardComponent} from './wizard.component';
import {WizardStepComponent} from './wizard-step.component';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    WizardComponent,
    WizardStepComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WizardComponent,
    WizardStepComponent
  ]
})
export class FormWizardModule {
}
