import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeNodesComponent } from './trade-nodes.component';

describe('TradeNodesComponent', () => {
  let component: TradeNodesComponent;
  let fixture: ComponentFixture<TradeNodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradeNodesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradeNodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
