import { FormStateService } from './form-state.service';
import { EventEmitter, Directive, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

import { SessionObject } from 'session-object';
import { Subscription } from 'rxjs';

@Directive()
export abstract class FormComponent<TModel> implements OnInit, OnDestroy {
    private initialValue: TModel;
    private sessionData: SessionObject<TModel>;
    private submitted: boolean;
    private subscriptions: Subscription[];

    public abstract createFormGroup: (formBuilder: FormBuilder, data: TModel) => FormGroup;

    public get hasPendingChanges(): boolean {
        return !this.submitted && this.formGroup.dirty;
    }

    @Input() set value(value: TModel) {
        if (this.formGroup) {
            this.formGroup.reset(value);
        } else {
            this.initialValue = value;
        }
    }
    get value() {
        return (this.formGroup) ? this.formGroup.value : this.initialValue;
    }

    private _formGroup: FormGroup;
    @Input() set formGroup(formGroup: FormGroup) {
        this._formGroup = formGroup;

        this.onSetFormGroup(formGroup);
    }
    get formGroup() {
        return this._formGroup;
    }
    
    @Input() sessionKey: string;

    @Output() submitForm = new EventEmitter<TModel>();

    public get control(): AbstractControl {
        return this.formGroup;
    }

    private clearSessionData() {
        if (this.sessionData) {
            this.sessionData.delete();
        }
    }

    private updateSessionData(value: any) {
        if (this.sessionData) {
            this.sessionData.set(value);
        }
    }

    constructor(
        protected formBuilder: FormBuilder,
        private formState: FormStateService
    ) { }

    ngOnInit() {
        if (this.sessionKey) {
            this.sessionData = new SessionObject<any>(`forms::form-component::session-data::${this.sessionKey}`);
        }

        const sessionDataValue = this.sessionData && this.sessionData.get();
        const initialFormGroupValue = sessionDataValue || this.initialValue || {} as TModel;

        if (!this.formGroup) {
            this.formGroup = this.createFormGroup(this.formBuilder, initialFormGroupValue);
        }

        if (sessionDataValue) {
            this.formGroup.markAsDirty();
        } else {
            this.updateSessionData(initialFormGroupValue);
        }

        this.subscriptions = [
            this.formGroup.valueChanges.subscribe(value => this.updateSessionData(value))
        ];
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
        this.clearSessionData();
    }

    onSubmit() {
        if (!this.formGroup.valid) {
            this.formState.showAllValidationErrors = true;
            return;
        }

        this.submitted = true;
        this.submitForm.emit(this.formGroup.value);
    }

    protected onSetFormGroup(formGroup: FormGroup) { }

    public createNewFormGroup(data: TModel): FormGroup {
        return this.createFormGroup(this.formBuilder, data);
    }
}
