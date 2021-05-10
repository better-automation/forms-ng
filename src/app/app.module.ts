import { AppStateService } from './app-state.service';
import { StateCodesDirective } from './components/forms/address-form/state-codes.directive';
import { FormsModule as FormsModule_ng} from '@angular/forms';

import { FormsNgModule } from 'forms-ng';
import { ContactFormComponent } from './components/forms/contact-form/contact-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TextBoxComponent } from './components/form-controls/text-box/text-box.component';
import { AppValidationErrorsComponent } from './components/validation-errors/validation-errors.component';
import { AddressFormComponent } from './components/forms/address-form/address-form.component';
import { DropDownComponent } from './components/form-controls/drop-down/drop-down.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { AddressPageComponent } from './pages/address-page/address-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactFormComponent,
    TextBoxComponent,
    AppValidationErrorsComponent,
    AddressFormComponent,
    DropDownComponent,
    StateCodesDirective,
    ContactPageComponent,
    AddressPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule_ng,
    ReactiveFormsModule,
    FormsNgModule.forRoot()
  ],
  providers: [AppStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
