import { FormArray } from '@angular/forms';

export class FormList<T> {
    public list: T[];

    public static create<TValue>(list?: TValue[]): FormList<TValue> {
        if (!list) {
            return undefined;
        }

        return { list };
    }

    public static formArray<TValue>(formArray: FormArray): { list: FormArray } {
        return {
            list: formArray
        };
    }

    public static formGroup<TValue>(formList: FormList<TValue>): { list: [TValue[]] } {
        return {
            list: [FormList.getValue(formList)]
        };
    }

    public static getValue<TValue>(formList: FormList<TValue>): TValue[] {
        return formList && formList.list;
    }
}
