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
  @Output() next: EventEmitter<any> = new EventEmitter<any>();
  @Output() prev: EventEmitter<any> = new EventEmitter<any>();
  @Output() completed: EventEmitter<any> = new EventEmitter<any>();
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
