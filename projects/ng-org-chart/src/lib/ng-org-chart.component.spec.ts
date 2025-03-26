import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgOrgChartComponent } from './ng-org-chart.component';

describe('NgOrgChartComponent', () => {
  let component: NgOrgChartComponent;
  let fixture: ComponentFixture<NgOrgChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgOrgChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgOrgChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
