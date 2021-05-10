import { Component, forwardRef, Input } from '@angular/core';
import { FormControlComponent } from 'forms-ng';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
