import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorFormComponent } from './simulator-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Simulator } from '../../models/simulator.model';
import { By } from '@angular/platform-browser';

describe('SimulatorFormComponent', () => {
  let component: SimulatorFormComponent;
  let fixture: ComponentFixture<SimulatorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorFormComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not show form while loading', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const form = fixture.debugElement.query(By.css('form'));

    expect(form).toBeNull();
  });

  it('should load data onInit', () => {
    const simulator = new Simulator({id: '123-321', name: 'test'});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.simulatorForm.controls['name'].value).toEqual(simulator.name);
  });

  it('should initialize with submit disabled', () => {
    const simulator = new Simulator({id: '', name: '', });
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;

    expect(component.simulatorForm.valid).toBeFalsy();
    expect(button.disabled).toBeTruthy();
  });

  it('should enable submit when form is valid', () => {
    const simulator = new Simulator({id: '', name: 'test', });
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;

    expect(component.simulatorForm.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  it('should emit simulatorCreated when form is submitted', () => {

    const simulator = new Simulator({id: '', name: 'test', });
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    jest.spyOn(component.simulatorSaved, 'emit').mockImplementation();

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;
    button.click();

    expect(component.simulatorSaved.emit).toHaveBeenCalledWith(simulator);
  });

  it('should not emit simulatorCreated when form is invalid', () => {

      const simulator = new Simulator({id: '', name: '', });
      component.simulator = simulator;

      component.ngOnChanges();
      fixture.detectChanges();

      jest.spyOn(component.simulatorSaved, 'emit').mockImplementation();

      component.onSubmit();

      expect(component.simulatorSaved.emit).not.toHaveBeenCalled();
  });
});
