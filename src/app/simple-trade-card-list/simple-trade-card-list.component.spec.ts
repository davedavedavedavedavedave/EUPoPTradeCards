import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTradeCardListComponent } from './simple-trade-card-list.component';

describe('SimpleTradeCardListComponent', () => {
  let component: SimpleTradeCardListComponent;
  let fixture: ComponentFixture<SimpleTradeCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleTradeCardListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTradeCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
