import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSimulatorComponent } from './create-simulator.component';

describe('CreateSimulatorComponent', () => {
  let component: CreateSimulatorComponent;
  let fixture: ComponentFixture<CreateSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
