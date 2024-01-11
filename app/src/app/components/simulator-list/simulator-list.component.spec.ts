import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorListComponent } from './simulator-list.component';
import { Simulator } from '../../models/simulator.model';
import { MockProvider } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

fdescribe('SimulatorListComponent', () => {
  let component: SimulatorListComponent;
  let fixture: ComponentFixture<SimulatorListComponent>;

  let simulatorService: SimulatorService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorListComponent],
      providers: [MockProvider(SimulatorService), MockProvider(Router)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorListComponent);
    component = fixture.componentInstance;

    simulatorService = TestBed.inject(SimulatorService);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data onInit', () => {
    const simulator = new Simulator({id: '123-321', name: 'test', email: 'a@a', address: '123 abc st'});

    spyOn(simulatorService, 'getAllSimulators').and.returnValue(of([simulator]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.simulators.length).toEqual(1);
    expect(component.simulators[0]).toEqual(simulator);
  });

  it('should navigate when row clicked on', () => {
    const simulator = new Simulator({id: '123-321', name: 'test', email: 'a@a', address: '123 abc st'});

    spyOn(simulatorService, 'getAllSimulators').and.returnValue(of([simulator]));
    spyOn(router, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();

    const simulatorRow = fixture.debugElement.query(By.css('#simulator-row')).nativeElement;
    simulatorRow.click();

    expect(router.navigate).toHaveBeenCalledWith(['edit-simulator', '123-321']);
  });

  it('should error when getAllSimulators fails', () => {
    spyOn(console, 'error').and.callFake(() => {});
    spyOn(simulatorService, 'getAllSimulators').and.returnValue(throwError(() => 'error'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.simulators.length).toEqual(0);
    expect(console.error).toHaveBeenCalled();
  });
});
