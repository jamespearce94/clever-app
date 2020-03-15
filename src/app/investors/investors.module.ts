import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestorsComponent } from './investors.component';
import { InvestorsRoutingModule } from './investors.routing.module';
import { DateFormatPipeModule } from '../shared/pipes/date-format-pipe/date-format.pipe.module';
import { InvestorDetailsComponent } from './investor-details/investor-details.component';
import { ButtonModule } from '../shared/button/button.module';
import { InvestorAccountReportComponent } from './investor-account-report/investor-account-report.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InvestorsRoutingModule,
        DateFormatPipeModule,
        NgxChartsModule,
        FontAwesomeModule
    ],
    exports: [
        InvestorsComponent,
        InvestorDetailsComponent,
        InvestorAccountReportComponent
    ],
    declarations: [
        InvestorsComponent,
        InvestorDetailsComponent,
        InvestorAccountReportComponent
    ],
    providers: [],
})
export class InvestorsModule { }
