import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'wizard-step',
  template:
        `
	  <div [hidden]="!isActive">
		  <ng-container *ngIf="templateContent else content">
			  <ng-template [ngTemplateOutlet]="templateContent"></ng-template>
		  </ng-container>

		  <ng-content #content></ng-content>
	  </div>
  `
})
export class WizardStepComponent {
  @Input() title: string;
  @Input() hidden: boolean = false;
  @Input() isValid: boolean = true;
  @Input() showNext: boolean = true;
  @Input() showPrev: boolean = true;

  @Output() onNext: EventEmitter<any> = new EventEmitter<any>();
  @Output() onPrev: EventEmitter<any> = new EventEmitter<any>();
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();

  @Input() templateContent: TemplateRef<void>;
  isDisabled: boolean = true;

  constructor() {
  }

  private _isActive: boolean = false;

  get isActive(): boolean {
    return this._isActive;
  }

  @Input('isActive')
  set isActive(isActive: boolean) {
    this._isActive = isActive;
    this.isDisabled = false;
  }

}
