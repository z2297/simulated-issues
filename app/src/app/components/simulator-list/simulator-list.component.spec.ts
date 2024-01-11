import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorListComponent } from './simulator-list.component';

describe('SimulatorListComponent', () => {
  let component: SimulatorListComponent;
  let fixture: ComponentFixture<SimulatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
