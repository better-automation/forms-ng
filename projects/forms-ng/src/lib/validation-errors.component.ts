import { FormStateService } from './form-state.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive()
export abstract class ValidationErrorsComponent {
    @Input() control: AbstractControl;

    public get errors(): ValidationErrors {
        if (this.control && this.control.errors && (this.control.touched || this.formState.showAllValidationErrors)) {
            return this.control.errors;
        }

        return null;
    }

    constructor(
        private formState: FormStateService
    ) { }
}
