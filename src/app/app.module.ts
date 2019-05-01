import { AppStateService } from './app-state.service';
import { StateCodesDirective } from './address-form/state-codes.directive';
import { FormsModule as FormsModule_ng} from '@angular/forms';

import { FormsModule } from 'forms-ng';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextBoxComponent } from './text-box/text-box.component';
import { AppValidationErrorsComponent } from './validation-errors/validation-errors.component';
import { AddressFormComponent } from './address-form/address-form.component';
import { DropDownComponent } from './drop-down/drop-down.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AddressComponent } from './pages/address/address.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    TextBoxComponent,
    AppValidationErrorsComponent,
    AddressFormComponent,
    DropDownComponent,
    StateCodesDirective,
    ContactComponent,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule_ng,
    ReactiveFormsModule,
    FormsModule.forRoot()
  ],
  providers: [AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
