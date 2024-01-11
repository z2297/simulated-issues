import { Component, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator-service.service';
import { Simulator } from '../../models/simulator.model';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';

@Component({
  selector: 'app-create-simulator',
  standalone: true,
  imports: [SimulatorFormComponent],
  templateUrl: './create-simulator.component.html',
  styleUrl: './create-simulator.component.scss'
})
export class CreateSimulatorComponent implements OnInit {
  constructor(private readonly simulatorService: SimulatorService) { }

  simulator: Simulator = new Simulator();

  ngOnInit(): void {

  }

  onCreateSimulator(simulator: Simulator): void {
    this.simulatorService.createSimulator(simulator).subscribe({
      next: () => {
        console.log('Simulator created');
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }
}