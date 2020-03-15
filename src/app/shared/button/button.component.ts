import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

export type ButtonType = 'primary' | 'secondary';

@Component({
    selector: 'sh-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {

    @Input() public type: string;

    @Input() public icon: string[];

    @Input() public set iconOnly(iconOnly: any) {
        this.iconOnlyState = coerceBooleanProperty(iconOnly);
    }

    public get iconOnly() {
        return this.iconOnlyState;
    }

    @Input() public styleType: ButtonType = 'primary';

    @Input() public set disabled(disabled: any) {
        this.disabledState = coerceBooleanProperty(disabled);
    }

    public get disabled() {
        return this.disabledState;
    }

    private disabledState: boolean = false;
    private iconOnlyState: boolean = false;

    @Output() public onClick: EventEmitter<void> = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    public onButtonClick(event: MouseEvent) {
        event.stopPropagation();
        this.onClick.emit();
    }
}