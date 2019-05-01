import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class FormStateService {
    public disableAllControls = false;
    public showAllValidationErrors = false;
}
