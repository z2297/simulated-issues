import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorFormComponent } from './simulator-form.component';

describe('SimulatorFormComponent', () => {
  let component: SimulatorFormComponent;
  let fixture: ComponentFixture<SimulatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulatorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
