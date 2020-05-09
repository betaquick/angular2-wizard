import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'lib-wizard-step',
  templateUrl: 'wizard-step.component.html'
})
export class WizardStepComponent {
  @Input() title: string;
  @Input() hidden = false;
  @Input() showNext = true;
  @Input() isValid = true;
  @Input() skipValidation = false;
  @Input() showPrev = true;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  isDisabled = true;
  isChecked = false;

  // tslint:disable-next-line:variable-name
  private _isActive = false;
  get isActive(): boolean {
    return this._isActive;
  }

  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

  constructor() {
  }
}
