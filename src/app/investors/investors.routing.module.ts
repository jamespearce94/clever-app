import { NgModule } from '@angular/core';
import { InvestorsComponent } from './investors.component';
import { RouterModule } from '@angular/router';
import { InvestorDetailsComponent } from './details/investor-details.component';

const routes = [
    {path:'', component: InvestorsComponent},
    {path: 'detail', component: InvestorDetailsComponent}
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
