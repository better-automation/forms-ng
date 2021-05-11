import { FormComponent } from 'forms-ng';
import { Component } from '@angular/core';
import { Address } from '../../../address.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as validators from '../validators';

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

  onSetFormGroup(formGroup: FormGroup) {
    console.log("Form Group has been set.", formGroup);
  }
}
