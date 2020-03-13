import { FormService } from './form.service';
import { FormStateService } from './form-state.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class FormsModule {
    public static forRoot(): ModuleWithProviders<FormsModule> {
        return {
            ngModule: FormsModule,
            providers: [
                FormStateService,
                FormService
            ]
        };
    }
}
