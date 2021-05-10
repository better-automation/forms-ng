import { CODES_ACCESSOR, Codes, Code } from 'codes-ng';
import { Directive, Inject, Input } from '@angular/core';

@Directive({
    selector: '[appStateCodes]'
})
export class StateCodesDirective {
    @Input() set appStateCodes(enabled: boolean) {
        if (enabled === false) {
            return;
        }

        this.component.codes = [
            'AK',
            'AL',
            'AR',
            'AS',
            'AZ',
            'CA',
            'CO',
            'CT',
            'DC',
            'DE',
            'FL',
            'GA',
            'GU',
            'HI',
            'IA',
            'ID',
            'IL',
            'IN',
            'KS',
            'KY',
            'LA',
            'MA',
            'MD',
            'ME',
            'MI',
            'MN',
            'MO',
            'MS',
            'MT',
            'NC',
            'ND',
            'NE',
            'NH',
            'NJ',
            'NM',
            'NV',
            'NY',
            'OH',
            'OK',
            'OR',
            'PA',
            'PR',
            'RI',
            'SC',
            'SD',
            'TN',
            'TX',
            'UT',
            'VA',
            'VI',
            'VT',
            'WA',
            'WI',
            'WV',
            'WY'
        ].map(stateCode => new Code(stateCode, stateCode));
    }

    constructor(
        @Inject(CODES_ACCESSOR) private component: Codes
    ) { }
}
