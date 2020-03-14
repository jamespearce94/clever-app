import { NgModule } from '@angular/core';
import { NavComponent } from './nav.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NavComponent
    ],
    declarations: [
        NavComponent
    ],
    providers: [],
})
export class NavModule { }
