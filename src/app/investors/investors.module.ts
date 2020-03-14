import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvestorsComponent } from './investors.component';
import { InvestorsRoutingModule } from './investors.routing.module';
import { DateFormatPipeModule } from '../shared/pipes/date-format-pipe/date-format.pipe.module';
 

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InvestorsRoutingModule,
        DateFormatPipeModule
    ],
    exports: [
        InvestorsComponent
    ],
    declarations: [
        InvestorsComponent
    ],
    providers: [],
})
export class InvestorsModule { }
