import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Route} from '@angular/router';

export interface INavRoute extends Route {
  label?: string;
}

const routes: INavRoute[] = [
  {
    path: 'investors',
    label: 'Investors',
    loadChildren: () => import('./investors/investors.module').then(m => m.InvestorsModule)
  },
  { path: '',   redirectTo: '/investors', pathMatch: 'full' },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
