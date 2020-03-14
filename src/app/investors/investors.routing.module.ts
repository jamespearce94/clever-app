import { NgModule } from '@angular/core';
import { InvestorsComponent } from './investors.component';
import { RouterModule } from '@angular/router';

const routes = [
    {path:'', component: InvestorsComponent}
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
