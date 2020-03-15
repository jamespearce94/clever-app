import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
    imports: [
        CommonModule,
        FontAwesomeModule
    ],
    exports: [
        ButtonComponent
    ],
    declarations: [
        ButtonComponent
    ],
    providers: [],
})
export class ButtonModule { }
