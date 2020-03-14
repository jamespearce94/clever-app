import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';
import { Observable, config } from 'rxjs';
import { IInvestor } from './core.interfaces';
import {isString} from 'lodash-es';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class InvestorsBackendService {

    private baseUrl: string = 'https://cleverapih55rbap66neaxmfe.azurewebsites.net/api';

    constructor(private readonly api: ApiRequestService) { }

    public getAllInvestors(): Observable<IInvestor[]> {
        return this.api.get(`${this.baseUrl}/investors/getby`).pipe(
            map((investors: any[]) => {
                return investors.map((investor) => {
                    investor.dateCreated = isString(investor?.dateCreated) ? new Date(investor.dateCreated) : investor.dateCreated;
                    return investor;
                });
            })
        )
    }
    
}