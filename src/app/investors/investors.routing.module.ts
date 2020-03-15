import { NgModule } from '@angular/core';
import { InvestorsComponent } from './investors.component';
import { RouterModule } from '@angular/router';
import { InvestorDetailsComponent } from './investor-details/investor-details.component';
import { InvestorAccountReportComponent } from './investor-account-report/investor-account-report.component';

const routes = [
    {path:'', component: InvestorsComponent},
    {path: 'detail', component: InvestorDetailsComponent},
    {path: 'report', component: InvestorAccountReportComponent}
]


@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [],
    providers: [],
})
export class InvestorsRoutingModule { }
