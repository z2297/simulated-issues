import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSimulatorComponent } from './edit-simulator.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { of, throwError } from 'rxjs';
import { Simulator } from '../../models/simulator.model';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';

// keeping this pattern around for a hot minute until we understand whether ngmocks 
// will work with Angular Testing Library
// const mockGetSimulator = jest.fn();
// const mockUpdateSimulator = jest.fn();
// jest.mock('../../services/simulator-service.service', () => {
//   return {
//     SimulatorService: jest.fn().mockImplementation(() => {
//       return { 
//         getSimulator: mockGetSimulator, 
//         updateSimulator: mockUpdateSimulator
//       };
//     }),
//   };
// });

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

  it('should load simulator on init', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});
    jest.spyOn(simulatorService, 'getSimulator').mockReturnValue(of(simulator));
    
    component.ngOnInit();
    fixture.detectChanges();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;

    expect(simulatorService.getSimulator).toHaveBeenCalledWith(routeId);
    expect(component.simulator).toEqual(simulator);
    expect(simulatorForm.simulator).toEqual(simulator);
  });

  it('should console error on get when simulator service fails', () => {
    jest.spyOn(simulatorService, 'getSimulator').mockReturnValue(throwError(() => 'test error'));
    jest.spyOn(console, 'error').mockImplementation();

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalled();
  });

  it('should call simulator service when simulator updated', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});
    jest.spyOn(simulatorService, 'updateSimulator').mockReturnValue(of(simulator));
    jest.spyOn(console, 'log').mockImplementation();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(simulatorService.updateSimulator).toHaveBeenCalledWith(simulator);
    expect(console.log).toHaveBeenCalledWith('simulator updated');
  });

  it('should console error on update when simulator service fails', () => {
    const simulator = new Simulator({ id: routeId,  name: 'John Doe', email: ''});
    jest.spyOn(simulatorService, 'updateSimulator').mockReturnValue(throwError(() => 'test error'));
    jest.spyOn(console, 'error').mockImplementation();

    const simulatorForm = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    simulatorForm.simulatorSaved.emit(simulator);

    expect(simulatorService.updateSimulator).toHaveBeenCalledWith(simulator);
    expect(console.error).toHaveBeenCalled();
  });
});
