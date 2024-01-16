import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSimulatorComponent } from './edit-simulator.component';
import { ActivatedRoute, Params, convertToParamMap } from '@angular/router';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { of, throwError } from 'rxjs';
import { Simulator } from '../../models/simulator.model';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';
import { HttpClient } from '@angular/common/http';

// can move these into a manual __mocks__ directory for reuse and test cleanup
const mockGetSimulator = jest.fn();
const mockUpdateSimulator = jest.fn();
jest.mock('../../services/simulator-service.service', () => {
  return {
    SimulatorService: jest.fn().mockImplementation(() => {
      return { 
        getSimulator: mockGetSimulator, 
        updateSimulator: mockUpdateSimulator
      };
    }),
  };
});

describe('EditSimulatorComponent', () => {
  let component: EditSimulatorComponent;
  let fixture: ComponentFixture<EditSimulatorComponent>;

  let simulatorService = new SimulatorService({} as HttpClient);;
  let route: ActivatedRoute;

  const routeId = '1';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditSimulatorComponent],
      declarations: [MockComponent(SimulatorFormComponent)],
      providers: [
        {
          provide: SimulatorService,
          useValue: simulatorService
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: routeId }))
          }
        }
      ]
    })
    .compileComponents();

    route = TestBed.inject(ActivatedRoute);

    fixture = TestBed.createComponent(EditSimulatorComponent);
    component = fixture.componentInstance;
  });

  it('should load simulator on init', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});
    mockGetSimulator.mockReturnValue(of(simulator));

    component.ngOnInit();
    fixture.detectChanges();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;

    expect(mockGetSimulator).toHaveBeenCalledWith(routeId);
    expect(component.simulator).toEqual(simulator);
    expect(simulatorForm.simulator).toEqual(simulator);
  });

  it('should console error when simulator service fails', () => {
    mockGetSimulator.mockReturnValue(throwError(() => 'test error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();
    fixture.detectChanges();

    expect(consoleSpy).toHaveBeenCalled();
  });

  it('should call simulator service when simulator updated', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});
    mockUpdateSimulator.mockReturnValue(of(simulator));
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(mockUpdateSimulator).toHaveBeenCalledWith(simulator);
    expect(consoleSpy).toHaveBeenCalledWith('simulator updated');
  });

  it('should console error when simulator service fails', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});

    mockUpdateSimulator.mockReturnValue(throwError(() => 'test error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(mockUpdateSimulator).toHaveBeenCalledWith(simulator);
    expect(consoleSpy).toHaveBeenCalled();
  });
});
