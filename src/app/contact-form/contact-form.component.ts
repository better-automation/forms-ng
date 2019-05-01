import { Component, OnInit } from '@angular/core';
import { FormComponent } from 'forms-ng';
import { Contact } from '../contact.model';
import { FormBuilder, Validators } from '@angular/forms';
import { addressFormGroup } from '../address-form/address-form.component';
import { Address } from '../address.model';

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
