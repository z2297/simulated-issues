import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorListComponent } from './simulator-list.component';
import { Simulator } from '../../models/simulator.model';
import { MockProvider } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SimulatorListComponent', () => {
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
    const simulator = new Simulator({id: '123-321', name: 'test', });

    jest.spyOn(simulatorService, 'getAllSimulators').mockReturnValue(of([simulator]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.simulators.length).toEqual(1);
    expect(component.simulators[0]).toEqual(simulator);
  });

  it('should navigate when row clicked on', () => {
    const simulator = new Simulator({id: '123-321', name: 'test', });

    jest.spyOn(simulatorService, 'getAllSimulators').mockReturnValue(of([simulator]));
    jest.spyOn(router, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();

    const simulatorRow = fixture.debugElement.query(By.css('#simulator-row')).nativeElement;
    simulatorRow.click();

    expect(router.navigate).toHaveBeenCalledWith(['edit-simulator', '123-321']);
  });

  it('should error when getAllSimulators fails', () => {
    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(simulatorService, 'getAllSimulators').mockReturnValue(throwError(() => 'error'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.simulators.length).toEqual(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should show number of simulators', () => {
    const simulator = new Simulator({id: '123-321', name: 'test', });

    jest.spyOn(simulatorService, 'getAllSimulators').mockReturnValue(of([simulator]));

    component.ngOnInit();
    fixture.detectChanges();

    const simulatorCount = fixture.debugElement.query(By.css('#simulator-count')).nativeElement;

    expect(simulatorCount.innerText).toContain('1 simulators found');
  });
});
