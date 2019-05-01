import { FormControl } from '@angular/forms';

export function zipCode(control: FormControl) {
    if (!control.value || /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(control.value)) {
        return null;
    }

    return { zipcode: { valid: false } };
}
