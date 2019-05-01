import { FormControlComponent } from 'forms-ng';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Code, Codes, CODES_ACCESSOR } from 'codes-ng';

@Component({
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent),
    multi: true,
  }, {
    provide: CODES_ACCESSOR,
    useExisting: forwardRef(() => DropDownComponent)
  }],
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css']
})
export class DropDownComponent extends FormControlComponent implements Codes {
  // tslint:disable-next-line:variable-name
  private _codes: Code[];
  @Input() get codes() {
    return this._codes;
  }
  set codes(codes: Code[]) {
    this._codes = codes;
  }

  @Input() isRequired: string;
  @Input() labelText: string;

  value: string;

  writeValue(value: any): void {
    this.value = value;
  }
}
