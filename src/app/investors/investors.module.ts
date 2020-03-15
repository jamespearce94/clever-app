import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InvestorsComponent } from './investors.component';
import { InvestorsRoutingModule } from './investors.routing.module';
import { DateFormatPipeModule } from '../shared/pipes/date-format-pipe/date-format.pipe.module';
import { InvestorDetailsComponent } from './details/investor-details.component';
import { ButtonModule } from '../shared/button/button.module';
 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ButtonModule,
        InvestorsRoutingModule,
        DateFormatPipeModule
    ],
    exports: [
        InvestorsComponent,
        InvestorDetailsComponent
    ],
    declarations: [
        InvestorsComponent,
        InvestorDetailsComponent
    ],
    providers: [],
})
export class InvestorsModule { }
