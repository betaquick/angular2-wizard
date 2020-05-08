import {NgModule} from '@angular/core';
import {WizardComponent} from './wizard.component';
import {WizardStepComponent} from './wizard-step.component';


@NgModule({
  declarations: [
    WizardComponent,
    WizardStepComponent
  ],
  imports: [],
  exports: [
    WizardComponent,
    WizardStepComponent
  ]
})
export class Angular2WizardModule {
}
