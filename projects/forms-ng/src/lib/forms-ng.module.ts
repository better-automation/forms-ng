import { FormService } from './form.service';
import { FormStateService } from './form-state.service';
import { NgModule, ModuleWithProviders } from '@angular/core';

@NgModule()
export class FormsNgModule {
    public static forRoot(): ModuleWithProviders<FormsNgModule> {
        return {
            ngModule: FormsNgModule,
            providers: [
                FormStateService,
                FormService
            ]
        };
    }
}
