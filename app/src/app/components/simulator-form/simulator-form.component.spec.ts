import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorFormComponent } from './simulator-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Simulator } from '../../models/simulator.model';
import { By } from '@angular/platform-browser';

fdescribe('SimulatorFormComponent', () => {
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
    const simulator = new Simulator({id: '123-321', name: 'test', email: 'a@a', address: '123 abc st'});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.simulatorForm.controls['name'].value).toEqual(simulator.name);
    expect(component.simulatorForm.controls['email'].value).toEqual(simulator.email);
    expect(component.simulatorForm.controls['address'].value).toEqual(simulator.address);
  });

  it('should initialize with submit disabled', () => {
    const simulator = new Simulator({id: '', name: '', email: '', address: ''});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;

    expect(component.simulatorForm.valid).toBeFalsy();
    expect(button.disabled).toBeTruthy();
  });

  it('should enable submit when form is valid', () => {
    const simulator = new Simulator({id: '', name: 'test', email: 'a@a', address: '123 abc st'});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;

    expect(component.simulatorForm.valid).toBeTruthy();
    expect(button.disabled).toBeFalsy();
  });

  it('should emit simulatorCreated when form is submitted', () => {

    const simulator = new Simulator({id: '', name: 'test', email: 'a@a', address: '123 abc st'});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    spyOn(component.simulatorSaved, 'emit');

    const button = fixture.debugElement.query(By.css('#submit-button')).nativeElement;
    button.click();

    expect(component.simulatorSaved.emit).toHaveBeenCalledWith(simulator);
  });

  it('should not emit simulatorCreated when form is invalid', () => {

      const simulator = new Simulator({id: '', name: '', email: '', address: ''});
      component.simulator = simulator;

      component.ngOnChanges();
      fixture.detectChanges();

      spyOn(component.simulatorSaved, 'emit');

      component.onSubmit();

      expect(component.simulatorSaved.emit).not.toHaveBeenCalled();
  });

  it('should validate address', () => {
    const simulator = new Simulator({id: '', name: 'test', email: 'a@a'});
    component.simulator = simulator;

    component.ngOnChanges();
    fixture.detectChanges();

    const address = component.simulatorForm.controls['address'];

    expect(address.errors).toBeNull();

    address.setValue('123 abc');
    expect(address.errors).toEqual({validAddress: true});

    address.setValue('123 abc st');
    expect(address.errors).toBeNull();
  });

});
