import { FormStateService } from './form-state.service';
import { ControlContainer, ControlValueAccessor, FormBuilder, AbstractControl } from '@angular/forms';
import { EventEmitter, Host, Input, Optional, Output, SkipSelf, Directive } from '@angular/core';

@Directive()
export abstract class FormControlComponent implements ControlValueAccessor {
    // tslint:disable-next-line:variable-name
    private _disabled: boolean;

    @Input() formControlName: string;

    @Input() set disabled(disabled: boolean) {
        this._disabled = disabled;
    }
    get disabled() {
        return (this._disabled || this.formState.disableAllControls);
    }

    @Output() touched = new EventEmitter<void>();

    public get control(): AbstractControl {
        return this.controlContainer.control.get(this.formControlName);
    }

    public changeValue: (value: any) => void;
    protected touchControl: () => void;

    constructor(
        @Optional() @Host() @SkipSelf()
        private controlContainer: ControlContainer,
        protected formBuilder: FormBuilder,
        private formState: FormStateService
    ) { }

    registerOnChange(fn: (value: any) => void) {
        this.changeValue = fn;
    }

    registerOnTouched(fn: () => void) {
        this.touchControl = fn;
    }

    touch() {
        this.touched.emit();
        this.touchControl();
    }

    public abstract writeValue(value: any): void;
}
