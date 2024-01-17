import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSimulatorComponent } from './create-simulator.component';
import { MockComponent, MockProvider, ngMocks } from 'ng-mocks';
import { SimulatorService } from '../../services/simulator-service.service';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';
import { Simulator } from '../../models/simulator.model';
import { of, throwError } from 'rxjs';

describe('CreateSimulatorComponent', () => {
  let component: CreateSimulatorComponent;
  let fixture: ComponentFixture<CreateSimulatorComponent>;

  let simulatorService: SimulatorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSimulatorComponent],
      declarations: [MockComponent(SimulatorFormComponent)],
      providers: [MockProvider(SimulatorService)]
    })
    .compileComponents();

    simulatorService = TestBed.inject(SimulatorService);

    fixture = TestBed.createComponent(CreateSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an new simulator', () => {
    expect(component.simulator).toBeTruthy();
  });

  it('should call the simulator service when creating a simulator', () => {
    const simulator = new Simulator({ name: 'John Doe', email: ''});

    jest.spyOn(console, 'log').mockImplementation();
    jest.spyOn(simulatorService, 'createSimulator').mockReturnValue(of(simulator));

    const form = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    form.simulatorSaved.emit(simulator);

    expect(simulatorService.createSimulator).toHaveBeenCalledWith(simulator);
    expect(console.log).toHaveBeenCalledWith('Simulator created');
  });

  it('should log an error when the simulator service fails', () => {
    const simulator = new Simulator({ name: 'John Doe', email: ''});

    jest.spyOn(console, 'error').mockImplementation();
    jest.spyOn(simulatorService, 'createSimulator').mockReturnValue(throwError(() => 'test error'));

    const form = ngMocks.find<SimulatorFormComponent>(SimulatorFormComponent).componentInstance;
    form.simulatorSaved.emit(simulator);

    expect(simulatorService.createSimulator).toHaveBeenCalledWith(simulator);
    expect(console.error).toHaveBeenCalled();
  });
});
