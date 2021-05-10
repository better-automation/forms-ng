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
import { FormControlComponent } from 'forms-ng';

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
import { FormComponent } from 'forms-ng';

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
* Use ngIf="formGroup" for situations when rendering happens before the variable is set
* Include ng-content inside the form so the page can define its own submit button

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

## Set an Initial Value to a Form
Send a value attribute to the FormComponent.

```html
  <app-address-form [value]="initialAddress" (submitForm)="submit($event)">
    <button>Submit</button>
  </app-address-form>
```

## Nested Forms Example

See the project for full source code of example.

### Define a Model

* This example shows the Address model as a child of the Contact model.

contact.model.ts
```typescript
import { Address } from './address.model';

export class Contact {
    name: string;
    email: string;
    address: Address;
}
```

### Create Child Form
* Export the form group function so it can be used by another form component.

address-form.component.ts
```typescript
export function addressFormGroup(formBuilder: FormBuilder, data: Address) {
  return formBuilder.group({
    address1: [data.address1, [Validators.required, Validators.maxLength(255)]],
    address2: [data.address2, Validators.maxLength(255)],
    city: [data.city, [Validators.required, Validators.maxLength(255)]],
    state: [data.state, [Validators.required, Validators.maxLength(255)]],
    zipCode: [data.zipCode, [Validators.required, validators.zipCode]]
  });
}

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent extends FormComponent<Address> {
  createFormGroup = addressFormGroup;
}
```

### Create Parent Form
* Import the form group function from the child form.
  * Use it to create the parent form group.
  * Create a new data object for child by default because it does not play nice without an instance of an object.
* Include the child form component in the parent form template.
  * Use [formGroup]="formGroup.get(fieldname)" to link the child form to the parent.

contact-form.component.ts
```typescript
import { addressFormGroup } from '../address-form/address-form.component';

export function contactFormGroup(formBuilder: FormBuilder, data: Contact) {
  return formBuilder.group({
    email: [data.email, [Validators.required, Validators.email]],
    name: [data.name, Validators.required],
    address: addressFormGroup(formBuilder, data.address || new Address())
  });
}

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent extends FormComponent<Contact> {
  createFormGroup = contactFormGroup;
}
```

contact-form.component.html
```html
<form [formGroup]="formGroup" (submit)="onSubmit()">
    <app-text-box [isRequired]="true" labelText="Name" formControlName="name"></app-text-box>
    <app-text-box [isRequired]="true" labelText="Email" formControlName="email"></app-text-box>

    <app-address-form [formGroup]="formGroup.get('address')"></app-address-form>

    <ng-content></ng-content>
</form>
```