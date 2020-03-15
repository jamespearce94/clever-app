import { Component, OnInit } from '@angular/core';
import { IInvestor, IAccount, IPieChartPoint } from 'src/app/core/core.interfaces';
import { Subscription, throwError } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { InvestorsBackendService } from 'src/app/core/investors-backend.service';
import { AccountsBackendService } from 'src/app/core/accounts-backend.service';
import { map, flatMap } from 'rxjs/operators';
import { isNumber, isObject, groupBy, reduce } from 'lodash-es';

@Component({
    selector: 'app-investor-account-report',
    templateUrl: './investor-account-report.component.html',
    styleUrls: ['./investor-account-report.component.scss']
})

export class InvestorAccountReportComponent implements OnInit {

    public investor: IInvestor;
    public investorAccounts: IAccount[];

    public pieChartData: IPieChartPoint[];
    public chartValueFormatFunc: (value: number) => string;

    private accountsSubscription: Subscription = new Subscription();

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly investorsService: InvestorsBackendService,
        private readonly accountsService: AccountsBackendService
    ) { }

    public ngOnInit() { 
        this.accountsSubscription.add(this.activatedRoute.queryParams.pipe(
            map((params: Params) => {
                let investorId;
                if (params && params.hasOwnProperty('id')) {
                    investorId = parseFloat(params.id);
                }
                return investorId;
            }),
            flatMap((investorId: number) => {
                if (isNumber(investorId)) {
                    return this.investorsService.getInvestorById(investorId);
                }
                throwError("Invalid investor id provided.");
            }),
            flatMap((investor) => {
                if (isObject(investor)) {
                    this.investor = investor;
                    return this.accountsService.getAccountByInvestorId(this.investor.investorId);
                }
                throwError("Unable to retrieve investor.");
            })
        ).subscribe((accounts: IAccount[]) => {
            this.investorAccounts = accounts;
            this.setChartData();
        },
        (e) => console.error(e)));

    }

    private setChartData() {
        const pieChartData: IPieChartPoint[] = [];

        if (this.investorAccounts && this.investorAccounts.length) {
            const grouped = groupBy(this.investorAccounts, 'type');
            for (let accountType in grouped) {
                if (accountType && isObject(grouped[accountType])) {
                    const accounts = grouped[accountType];
                    pieChartData.push({
                        name: accountType,
                        value: reduce(accounts, (sum, n) => {
                            return sum + n.amountHeld;
                        }, 0)
                    })
                }
            }
        }
        this.pieChartData = pieChartData;
    }
}