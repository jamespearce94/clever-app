import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {INavRoute} from '../../app-routing.module';

@Component({
    selector: 'sh-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {

    public routes: INavRoute;

    constructor(private readonly router: Router) { }

    public ngOnInit() {
        const links = this.router.config.filter((x) => x.path?.length > 0 && x.path !== '**');
        this.routes = links as INavRoute;
     }
}