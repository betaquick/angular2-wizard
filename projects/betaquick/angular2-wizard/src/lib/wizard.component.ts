import {AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {WizardStepComponent} from './wizard-step.component';

@Component({
  selector: 'lib-form-wizard',
  templateUrl: 'wizard.component.html',
  styles: [
    '.card { height: 100%; min-width: 75vh }',
    '.card-body { overflow-y: auto; }',
    '.active { font-weight: bold; color: black; border-bottom-color: #1976D2 !important; }',
  ]
})
export class WizardComponent implements AfterContentInit {
  @Input() loading = false;
  @Input() doneText = 'Done';
  @Input() nextText = 'Next';
  @Input() skipValidation = false;
  @Input() previousText = 'Previous';
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(WizardStepComponent) wizardSteps: QueryList<WizardStepComponent>;
  @Output() stepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

  // tslint:disable-next-line:variable-name
  private _steps: Array<WizardStepComponent> = [];
  // tslint:disable-next-line:variable-name
  private _isCompleted = false;


  constructor() {
  }

  ngAfterContentInit() {
    this.wizardSteps.forEach((step: WizardStepComponent) => this._steps.push(step));
    if (this.steps.length) {
      this.steps[0].isActive = true;
    }
  }

  get steps(): Array<WizardStepComponent> {
    return this._steps.filter(step => !step.hidden);
  }

  get isCompleted(): boolean {
    return this._isCompleted;
  }

  get activeStep(): WizardStepComponent {
    return this.steps.find(step => step.isActive);
  }

  set activeStep(step: WizardStepComponent) {
    if (step !== this.activeStep && !step.isDisabled) {
      this.activeStep.isActive = false;
      step.isActive = true;
      this.stepChanged.emit(step);
    }
  }

  public get activeStepIndex(): number {
    return this.steps.indexOf(this.activeStep);
  }

  get hasNextStep(): boolean {
    return this.activeStepIndex < this.steps.length - 1;
  }

  get hasPrevStep(): boolean {
    return this.activeStepIndex > 0;
  }

  public revertToStep(stepIndex: any) {
    this._isCompleted = false;
    const nextStep: WizardStepComponent = this.steps[stepIndex];
    this.goToStep(nextStep);
  }

  public reset(stepIndex = 0) {
    const nextStep: WizardStepComponent = this.steps[stepIndex];
    this.goToStep(nextStep);
    this._isCompleted = false;
  }

  public goToStep(step: WizardStepComponent): void {
    this.activeStep = step;
  }

  public next(): void {
    if (this.hasNextStep) {
      const nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];

      this.activeStep.isChecked = true;

      if (this.activeStep.skipValidation || this.activeStep.isValid) {
        this.activeStep.next.emit();
        nextStep.isDisabled = false;
        this.activeStep = nextStep;
      }
    }
  }

  public previous(): void {
    if (this.hasPrevStep) {
      const prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.prev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  public complete(): void {
    this.activeStep.isChecked = true;

    if (!this.skipValidation && this.steps.some(step => !step.isValid)) {
      this.revertToStep(this.steps.findIndex(step => !step.isValid));
    } else {
      this._isCompleted = true;
      this.activeStep.completed.emit();
    }
  }

}
