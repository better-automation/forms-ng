import { AppStateService } from './../../app-state.service';
import { Component } from '@angular/core';
import { FormService } from 'forms-ng';
import { Contact } from 'src/app/contact.model';
import { Address } from 'src/app/address.model';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent {
  displayText = '';

  get address() {
    return this.appStateService.address;
  }

  constructor(
    private appStateService: AppStateService,
    private formService: FormService
  ) { }

  reset() {
    this.appStateService.address = new Address();
  }

  submit(contact: Contact) {
    this.displayText = 'processing...';

    this.formService.disableAllControls();

    setTimeout(() => {
      this.displayText = JSON.stringify(contact, null, 2);
      this.formService.disableAllControls(false);
    }, 1000);
  }
}
