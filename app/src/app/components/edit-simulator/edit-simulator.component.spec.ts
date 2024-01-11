import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSimulatorComponent } from './edit-simulator.component';

describe('EditSimulatorComponent', () => {
  let component: EditSimulatorComponent;
  let fixture: ComponentFixture<EditSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSimulatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
