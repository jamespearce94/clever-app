import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { InvestorsComponent } from './investors.component';
import { InvestorsBackendService } from '../core/investors-backend.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('Investors Component', () => {
    let component: InvestorsComponent;
    let fixture: ComponentFixture<InvestorsComponent>;
    let service: InvestorsBackendService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InvestorsComponent
      ],
      providers: [
        {provide: InvestorsBackendService, useValue: {}},
        {provide: ActivatedRoute, useValue: {}},
        {provide: Router, useValue: {}}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorsComponent);
    component = fixture.componentInstance;
    service = TestBed.get(InvestorsBackendService);
    fixture.detectChanges();
});

  it(`should only show items with test in the name`, () => {
    component.investors = [
        {name: 'Test'},
        {name: 'test'},
        {name: 'abc'},
        {name: '***'},
        {name: null}
    ] as any[];

    component.onSearch('test');
    expect(component.filteredInvestors.length).toEqual(2);
  });
});
