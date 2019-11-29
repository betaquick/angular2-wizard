import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'wizard-step',
  template:
        `
		<div [hidden]="!isActive">
			<ng-content></ng-content>
		</div>
  `
})
export class WizardStepComponent {
  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() showNext: boolean = true;
  @Input() isValid: boolean = true;
  @Input() skipValidation: boolean = false;
  @Input() showPrev: boolean = true;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  isDisabled: boolean = true;
  isChecked: boolean = false;

  private _isActive: boolean = false;
  get isActive(): boolean {
    return this._isActive;
  }

  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isChecked = false;
    this.isDisabled = false;
  }

  constructor() {
  }
}
