import { Component, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator-service.service';
import { Simulator } from '../../models/simulator.model';
import { ActivatedRoute } from '@angular/router';
import { SimulatorFormComponent } from '../simulator-form/simulator-form.component';

@Component({
  selector: 'app-edit-simulator',
  standalone: true,
  imports: [SimulatorFormComponent],
  templateUrl: './edit-simulator.component.html',
  styleUrl: './edit-simulator.component.scss'
})
export class EditSimulatorComponent implements OnInit {
  constructor(
    private readonly simulatorService: SimulatorService,
    private readonly route: ActivatedRoute
  ) { }

  simulator!: Simulator;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') as string;
      this.getSimulator(id);
    });
  }

  onUpdateSimulator(simulator: Simulator): void {
    this.simulatorService.updateSimulator(simulator).subscribe({
      next: () => {
        console.log('simulator updated');
      },
      error: (error: string) => {
        console.error(error);
      }
    })
  }


  private getSimulator(id: string): void {
    this.simulatorService.getSimulator(id).subscribe({
      next: (simulator: Simulator) => {
        this.simulator = simulator;
      },
      error: (error: string) => {
        console.error('An error occurred:', error);
      }
    });
  }
}
