import { ValidationErrorsComponent } from 'forms-ng';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-validation-errors',
  templateUrl: './validation-errors.component.html',
  styleUrls: ['./validation-errors.component.css']
})
export class AppValidationErrorsComponent extends ValidationErrorsComponent {
  @Input() labelText = 'Field';
}
