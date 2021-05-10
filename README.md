# forms-ng

Note: This package is under development. Expect breaking changes in upcoming releases.

## Purpose

* reuse form behavior in Angular
* allow flexibility of design
* type safety

## Installation
```
npm i forms-ng
```

## Validation Errors

The FormValidationErrorsComponent class holds the logic that shows and hides the validation errors. The validation errors are shown when the form control is touched. Validation errors are also shown for all form controls when the user attempts to submit the form with invalid data.

Create a class that extends FormValidationErrorsComponent to adopt this functionality.

validation-errors.component.ts
```typescript
import { FormValidationErrorsComponent } from 'forms-ng';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class ValidationErrorsComponent extends FormValidationErrorsComponent {
  @Input() labelText = 'Field';
}
```

Create a template to show the errors. The errors property is provided by the FormValidationErrorsComponent class.

validation-errors.component.html
```html
<ng-container *ngIf="errors">
  <div *ngIf="errors.email"><span>* {{labelText}} must be a valid email address.</span></div>
  <div *ngIf="errors.maxlength"><span>* The length of {{labelText}} must not exceed {{errors.maxlength.requiredLength}} characters.</span></div>
  <div *ngIf="errors.required"><span>* {{labelText}} is required.</span></div>
</ng-container>
```

## Form Controls

To create a form control component, extend the FormControlComponent class and provide Angular's NG_VALUE_ACCESSOR. Implement the writeValue function so the component can hydrate itself when the value is updated by the FormGroup. The FormControlComponent class is an implementation of Angular's ControlValueAccessor.

text-box.component.ts
```typescript
@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TextBoxComponent),
    multi: true,
  }],
  selector: 'app-text-box',
  templateUrl: './text-box.component.html',
  styleUrls: ['./text-box.component.css']
})
export class TextBoxComponent extends FormControlComponent {
  @Input() isRequired: string;
  @Input() labelText: string;

  value: string;

  writeValue(value: any): void {
    this.value = value;
  }
}
```

Create a template for the form control. 
* The touch and changeValue functions and the disabled and control properties are provided by the FormControlComponent class.
* Send the control value to the FormValidationErrorsComponent to enable validation error display behavior.


text-box.component.html
```html
<div>
    <label>{{labelText}}</label>
    <span *ngIf="isRequired">*</span>
</div>
<div><input [disabled]="disabled" type="text" (blur)="touch()" [(ngModel)]="value" (ngModelChange)="changeValue($event)" /></div>

<app-validation-errors [control]="control" [labelText]="labelText"></app-validation-errors>
```

## Forms

Start with a model that represents the form data.

contact.model.ts
```typescript
export class Contact {
    companyName: string;
    contactName: string;
    email: string;
}
```

Create a component that implements FormComponent<T>. 
* Export the createFormGroup function so it can be used in nested forms (optional).

contact-form.component.ts
```typescript
export function contactFormGroup(formBuilder: FormBuilder, data: Contact) {
    return formBuilder.group({
        companyName: [data.companyName, Validators.required],
        contactName: [data.contactName, Validators.required],
        email: [data.email, [Validators.required, Validators.email]]
    });
}

@Component({
    selector: 'contact-form',
    templateUrl: './contact-form.component.html'
})
export class ContactFormComponent extends FormComponent<Contact> {
    createFormGroup = contactFormGroup;
}
```

Create a template for the form using form controls. 
* The formGroup property and onSubmit function are provided by the FormComponent class

contact-form.component.html
```html
<form *ngIf="formGroup" [formGroup]="formGroup" (submit)="onSubmit()">
    <app-text-box isRequired formControlName="companyName" labelText="Company Name"></text-box>
    <app-text-box isRequired formControlName="contactName" labelText="Contact Name"></text-box>
    <app-text-box isRequired formControlName="Email" labelText="Email"></text-box>

    <ng-content></ng-content>
</form>
```

## Using It

Wire up the form to your own submit function.
* The submitForm event is provided by the FormComponent class
* The event is fired when the form is submitted and passes validation.

Add a button so the user can submit the form.

example-contact.component.html
```html
<h3>Example Contact</h3>

<contact-form (submitForm)="submit($event)">
    <button>Save</button>
</contact-form>
```

example-contact.component.ts
```typescript
@Component({
    templateUrl: './example-contact-page.component.html'
})
export class ExampleContactPageComponent {
    submit(contact: Contact) {
        alert('TODO: SEND TO SERVER: ' + JSON.stringify(contact));
    }
}
```
