import { Injectable } from '@angular/core';
import { Address } from './address.model';

@Injectable()
export class AppStateService {
    address: Address;
}
