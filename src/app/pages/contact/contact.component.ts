import { AppStateService } from './../../app-state.service';
import { Component, ViewChild } from '@angular/core';
import { FormService } from 'forms-ng';
import { Contact } from 'src/app/contact.model';
import { ContactFormComponent } from 'src/app/contact-form/contact-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  displayText = '';

  @ViewChild(ContactFormComponent) contactFormComponent: ContactFormComponent;

  constructor(
    private appStateService: AppStateService,
    private formService: FormService,
    private router: Router
  ) { }

  reset() {
    this.contactFormComponent.formGroup.reset();
  }

  submit(contact: Contact) {
    this.displayText = 'processing...';

    this.formService.disableAllControls();

    setTimeout(() => {
      this.appStateService.address = contact.address;
      this.displayText = JSON.stringify(contact, null, 2);
      this.formService.disableAllControls(false);
      this.router.navigateByUrl('/address');
    }, 1000);
  }
}
