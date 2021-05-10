import { AddressPageComponent } from './pages/address-page/address-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'address', pathMatch: 'full' },
  { path: 'address', component: AddressPageComponent },
  { path: 'contact', component: ContactPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
