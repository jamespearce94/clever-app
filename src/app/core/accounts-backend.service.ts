import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { map } from 'rxjs/operators';
import { isString } from 'lodash-es';
import { Observable } from 'rxjs';
import { AccountType, IAccount } from './core.interfaces';

@Injectable({providedIn: 'root'})
export class AccountsBackendService {

    private baseUrl: string = 'https://cleverapih55rbap66neaxmfe.azurewebsites.net/api';

    constructor(private readonly api: ApiRequestService) { }

    public getAccountsByInvestorId(id: number): Observable<IAccount[]> {
        return this.api.get(`${this.baseUrl}/accounts/byinvestorid/${id}`).pipe(
            map((accounts: any[]) => {
                return accounts.map((account) => {
                    account.dateCreated = isString(account?.dateCreated) ? new Date(account.dateCreated) : account.dateCreated;
                    return account;
                })
            }) 
        )
    }

    public createNewAccount(newAccount: {amountHeld: number, type: AccountType, investorId: number, dateCreated: Date}): Observable<IAccount> {
        return this.api.post(`${this.baseUrl}/accounts`, newAccount).pipe(
            map((account) => {
                account.dateCreated = isString(account?.dateCreated) ? new Date(account.dateCreated) : account.dateCreated;
                return account;
            }) 
        )
    }
    
}