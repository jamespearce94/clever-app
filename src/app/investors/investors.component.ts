import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { InvestorsBackendService } from '../core/investors-backend.service';
import { IInvestor } from '../core/core.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take, flatMap } from "rxjs/operators";

@Component({
    selector: 'app-investors',
    templateUrl: './investors.component.html',
    styleUrls: ['./investors.component.scss']
})

export class InvestorsComponent implements OnInit, OnDestroy {

    public investors: IInvestor[] = [];
    public filteredInvestors: IInvestor[] = [];
    public searchTerm: string ="";
    public searchOption: string = "name";

    private investorsSubscription: Subscription = new Subscription();

    constructor(
        private readonly investorsService: InvestorsBackendService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    public ngOnInit() {
        this.investorsSubscription.add(this.activatedRoute.queryParams.pipe(
            map((params) => {
                if (params && params.hasOwnProperty("searchTerm")) {
                    this.searchTerm = params["searchTerm"];
                }
            }),
            flatMap(() => {
                return this.getInvestors();
            }),
            take(1)
        ).subscribe((investors: IInvestor[]) => {
            this.investors = investors;
            this.filteredInvestors = this.filterBy(this.investors, this.searchOption, this.searchTerm);
        }));
    }

    public ngOnDestroy() {
        this.investorsSubscription.unsubscribe();
    }

    public onSearch(searchTerm: string) {

        this.router.navigate(
            [], 
            {
              relativeTo: this.activatedRoute,
              queryParams: {searchTerm: searchTerm}, 
              queryParamsHandling: 'merge',
            });

        this.filteredInvestors = this.filterBy(this.investors, this.searchOption, searchTerm);
    }

    public onInvestorSelected(investor: IInvestor, event: MouseEvent) {
        event.stopPropagation();
        if (!investor || !investor.hasOwnProperty('investorId')) {
            throw new Error("Invalid investor selection.");
        }
        this.router.navigate(['./detail'], {relativeTo: this.activatedRoute, queryParams: {id: investor?.investorId}});
    }

    public onInvestorReportSelected(investor: IInvestor, event: MouseEvent) {
        event.stopPropagation();
        if (!investor || !investor.hasOwnProperty('investorId')) {
            throw new Error("Invalid investor selection.");
        }
        this.router.navigate(['./report'], {relativeTo: this.activatedRoute, queryParams: {id: investor?.investorId}});
    }

    private getInvestors(): Observable<any[]> {
        return this.investorsService.getAllInvestors();
    }

    private filterBy(investors: IInvestor[], key: string, searchTerm: string): IInvestor[] {
        return investors.filter((x) => {
            return x[key].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });
    }
}