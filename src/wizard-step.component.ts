import {AfterContentInit, Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'wizard-step',
  template:
        `
		<div [hidden]="!isActive">
			<ng-content></ng-content>
		</div>
  `
})
export class WizardStepComponent implements AfterContentInit {
  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;
  @ContentChild(NgForm) form: NgForm;
  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  isDisabled: boolean = true;

  constructor() {
  }

  private _isValid: boolean = true;

  get isValid(): boolean {
    return this._isValid;
  }

  @Input()
  set isValid(value: boolean) {
    this._isValid = value;
  }

  private _isActive: boolean = false;

  get isActive(): boolean {
    return this._isActive;
  }

  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
    if (this.form) {
      this.isValid = this.form.form.valid;
    }
  }

  ngAfterContentInit(): void {
    if (this.form) {
      this.isValid = this.form.form.valid;
    }

    this.form.statusChanges.subscribe(() => {
      if (this.form) {
        this.isValid = this.form.form.valid;
      }
    });
  }
}
