import {Component, Input, Output, EventEmitter, ContentChildren, QueryList, AfterContentInit, OnChanges} from '@angular/core';
import {WizardStepComponent} from './wizard-step.component';

@Component({
  selector: 'form-wizard',
  template:
        `
		<div class="card">
			<div class="card-header">
				<ul class="nav nav-justified">
					<li class="nav-item" *ngFor="let step of steps"
					    [ngClass]="{'active': step.isActive, 'enabled': !step.isDisabled, 'disabled': step.isDisabled, 'completed': isCompleted}">
						<a (click)="goToStep(step)">{{step.title}}</a>
					</li>
				</ul>
			</div>
			<div class="card-block">
				<ng-content></ng-content>
			</div>
			<div class="card-footer" [hidden]="isCompleted">
                		<button type="button" class="btn btn-outline-danger float-left mr-2" (click)="cancelForm()">Cancel</button>
				<button type="button" class="btn btn-secondary float-left" (click)="previous()" [hidden]="!hasPrevStep || !activeStep.showPrev">
					{{ previousText }}
				</button>
				<button type="button" class="btn btn-secondary float-right" (click)="next()"
				        [disabled]="activeStep.isChecked && !activeStep.isValid"
				        [hidden]="!hasNextStep || !activeStep.showNext">{{ nextText }}
				</button>
				<button type="button" class="btn btn-secondary float-right" (click)="complete()"
				        [disabled]="activeStep.isChecked && !activeStep.isValid"
				        [hidden]="hasNextStep">{{ doneText }}
				</button>
			</div>
		</div>`
  ,
  styles: [
    '.card { height: 100%; }',
    '.card-header { background-color: #fff; padding: 0; font-size: 1.25rem; }',
    '.card-block { overflow-y: auto; }',
    '.card-footer { background-color: #fff; border-top: 0 none; }',
    '.nav-item { padding: 1rem 0rem; border-bottom: 0.5rem solid #ccc; }',
    '.active { font-weight: bold; color: black; border-bottom-color: #1976D2 !important; }',
    '.enabled { cursor: pointer; border-bottom-color: rgb(88, 162, 234); }',
    '.disabled { color: #ccc; }',
    '.completed { cursor: default; }'
  ]
})
export class WizardComponent implements AfterContentInit, OnChanges {
  @ContentChildren(WizardStepComponent)
  wizardSteps: QueryList<WizardStepComponent>;
  @Input() forceStep: number;
  @Input() previousText: string = 'Previous';
  @Input() nextText: string = 'Next';
  @Input() doneText: string = 'Done';
  @Input() skipValidation: boolean = false;
  @Output() cancel: EventEmitter<any> = new EventEmitter<any>();

  private _steps: Array<WizardStepComponent> = [];
  private _isCompleted: boolean = false;

  @Output()
  onStepChanged: EventEmitter<WizardStepComponent> = new EventEmitter<WizardStepComponent>();

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
      this.onStepChanged.emit(step);
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

  ngOnChanges() {
    if (this.forceStep) {
      this.revertToStep(this.forceStep);
    }
  }

  public revertToStep(stepIndex: any) {
    this._isCompleted = false;
    let nextStep: WizardStepComponent = this.steps[stepIndex];
    this.goToStep(nextStep);
  };

  public goToStep(step: WizardStepComponent): void {
    if (!this.isCompleted) {
      this.activeStep = step;
    }
  }

  public next(): void {
    if (this.hasNextStep) {
      let nextStep: WizardStepComponent = this.steps[this.activeStepIndex + 1];

      if (!this.activeStep.skipValidation && !this.activeStep.isValid) {
        this.activeStep.isChecked = true;
      } else {
        this.activeStep.onNext.emit();
        nextStep.isDisabled = false;
        this.activeStep = nextStep;
      }
    }
  }

  public previous(): void {
    if (this.hasPrevStep) {
      let prevStep: WizardStepComponent = this.steps[this.activeStepIndex - 1];
      this.activeStep.onPrev.emit();
      prevStep.isDisabled = false;
      this.activeStep = prevStep;
    }
  }

  public complete(): void {
    if (!this.skipValidation && this.steps.some(step => !step.isValid)) {
      console.log(this.steps.findIndex(step => !step.isValid));
      this.activeStep.isChecked = true;
    } else {
      this._isCompleted = true;
      this.activeStep.onComplete.emit();
    }
  }

  public cancelForm(): void {
    this.cancel.emit();
  }

}
