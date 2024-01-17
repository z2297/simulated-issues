import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorSearchComponent } from './simulator-search.component';

describe('SimulatorSearchComponent', () => {
  let component: SimulatorSearchComponent;
  let fixture: ComponentFixture<SimulatorSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimulatorSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
