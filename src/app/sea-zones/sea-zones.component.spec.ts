import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeaZonesComponent } from './sea-zones.component';

describe('SeaZonesComponent', () => {
  let component: SeaZonesComponent;
  let fixture: ComponentFixture<SeaZonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeaZonesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeaZonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
