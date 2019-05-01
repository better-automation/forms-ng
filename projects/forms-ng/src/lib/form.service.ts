import { FormStateService } from './form-state.service';
import { Injectable } from '@angular/core';

@Injectable()
export class FormService {
    constructor(
        private formState: FormStateService
    ) { }

    public disableAllControls(disableAllControls = true) {
        this.formState.disableAllControls = disableAllControls;
    }
}
