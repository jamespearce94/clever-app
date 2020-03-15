import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map, flatMap } from 'rxjs/operators';
import { of, throwError, Subscription } from 'rxjs';
import { isNumber, isObject, sortBy } from 'lodash-es'; 
import { InvestorsBackendService } from 'src/app/core/investors-backend.service';
import { IInvestor, IAccount, IOption, AccountType } from 'src/app/core/core.interfaces';
import { AccountsBackendService } from 'src/app/core/accounts-backend.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-investor-details',
    templateUrl: './investor-details.component.html',
    styleUrls: ['./investor-details.component.scss']
})

export class InvestorDetailsComponent implements OnInit, OnDestroy {

    public investor: IInvestor;
    public investorAccounts: IAccount[];

    public accountTypeOptions: IOption<AccountType>[] = [];

    accountForm = new FormGroup({
        amountHeld: new FormControl('', Validators.required),
        type: new FormControl('', Validators.required),
    });

    get amountHeld() { return this.accountForm.get('amountHeld'); }

    get accountType() { return this.accountForm.get('type'); }

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
            this.setAccountTypeOptions();
            this.investorAccounts = sortBy(accounts, 'dateCreated').reverse();
        },
        (e) => console.error(e)));

    }

    public ngOnDestroy() {
        this.accountsSubscription.unsubscribe();
    }

    public onAddNewAccount() {
        const accountDTO = {
            ...this.accountForm.value,
            investorId: this.investor.investorId,
            dateCreated: new Date
        }

        this.accountsSubscription.add(
            this.accountsService.createNewAccount(accountDTO).subscribe((account) => {
                if (this.investorAccounts?.length > 0) {
                    this.investorAccounts = sortBy([...this.investorAccounts, account], 'dateCreated').reverse();
                } else {
                    this.investorAccounts = [account];
                }
            },
            e => console.error(e))
        );
    }
    
    private setAccountTypeOptions() {
        this.accountTypeOptions = [
            {
                viewValue: 'Bond',
                value: 'Bond'
            },
            {
                viewValue: 'GIA',
                value: 'GIA'
            },
            {
                viewValue: 'ISA',
                value: 'ISA'
            },
            {
                viewValue: 'Pension',
                value: 'Pension'
            }
        ]
    }
}