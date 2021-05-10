import { AppStateService } from '../../app-state.service';
import { Component, NgZone, ViewChild } from '@angular/core';
import { FormService } from 'forms-ng';
import { Contact } from 'src/app/contact.model';
import { ContactFormComponent } from '../../components/forms/contact-form/contact-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html'
})
export class ContactPageComponent {
  contact: Contact;
  displayText = '';

  @ViewChild(ContactFormComponent) contactFormComponent: ContactFormComponent;

  constructor(
    private appStateService: AppStateService,
    private formService: FormService,
    private router: Router
  ) { }

  editAddress() {
    this.appStateService.address = this.contact.address;

    this.router.navigateByUrl('/address');
  }

  reset() {
    this.contactFormComponent.formGroup.reset();
  }

  submit(contact: Contact) {
    this.contact = contact;

    this.displayText = JSON.stringify(contact, null, 2);
    this.formService.disableAllControls(false);
  }
}
