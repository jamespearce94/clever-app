import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { map } from 'rxjs/operators';
import { isString } from 'lodash-es';
import { Observable } from 'rxjs';
import { AccountType } from './core.interfaces';

@Injectable({providedIn: 'root'})
export class AccountsBackendService {

    private baseUrl: string = 'https://cleverapih55rbap66neaxmfe.azurewebsites.net/api';

    constructor(private readonly api: ApiRequestService) { }

    public getAccountByInvestorId(id: number): Observable<any> {
        return this.api.get(`${this.baseUrl}/accounts/byinvestorid/${id}`).pipe(
            map((accounts: any[]) => {
                return accounts.map((account) => {
                    account.dateCreated = isString(account?.dateCreated) ? new Date(account.dateCreated) : account.dateCreated;
                    return account;
                })
            }) 
        )
    }

    public createNewAccount(newAccount: {amountHeld: number, type: AccountType, investorId: number, dateCreated: Date}) {
        return this.api.post(`${this.baseUrl}/accounts`, newAccount).pipe(
            map((account) => {
                account.dateCreated = isString(account?.dateCreated) ? new Date(account.dateCreated) : account.dateCreated;
                return account;
            }) 
        )
    }
    
}