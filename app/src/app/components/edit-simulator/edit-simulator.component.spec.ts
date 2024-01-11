import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSimulatorComponent } from './edit-simulator.component';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { of, throwError } from 'rxjs';
import { Simulator } from '../../models/simulator.model';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';

describe('EditSimulatorComponent', () => {
  let component: EditSimulatorComponent;
  let fixture: ComponentFixture<EditSimulatorComponent>;

  let simulatorService: SimulatorService;
  let route: ActivatedRoute;

  const routeId = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSimulatorComponent],
      declarations: [MockComponent(SimulatorFormComponent)],
      providers: [
        MockProvider(SimulatorService),
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: routeId }))
          }
        }
      ]
    })
    .compileComponents();

    simulatorService = TestBed.inject(SimulatorService);
    route = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(EditSimulatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load simulator on init', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});

    spyOn(simulatorService, 'getSimulator').and.returnValue(of(simulator));

    component.ngOnInit();
    fixture.detectChanges();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;

    expect(simulatorService.getSimulator).toHaveBeenCalledWith(routeId);
    expect(component.simulator).toEqual(simulator);
    expect(simulatorForm.simulator).toEqual(simulator);
  });

  it('should console error when simulator service fails', () => {
    spyOn(console, 'error');
    spyOn(simulatorService, 'getSimulator').and.returnValue(throwError(() => 'test error'));

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalled();
  });

  it('should call simulator service when simulator updated', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});

    spyOn(simulatorService, 'updateSimulator').and.returnValue(of(simulator));
    spyOn(console, 'log');

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(simulatorService.updateSimulator).toHaveBeenCalledWith(simulator);
    expect(console.log).toHaveBeenCalledWith('simulator updated');
  });

  it('should console error when simulator service fails', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});

    spyOn(simulatorService, 'updateSimulator').and.returnValue(throwError(() => 'test error'));
    spyOn(console, 'error');

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(simulatorService.updateSimulator).toHaveBeenCalledWith(simulator);
    expect(console.error).toHaveBeenCalled();
  });
});
