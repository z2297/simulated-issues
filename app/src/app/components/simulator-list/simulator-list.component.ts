import { Component, OnInit } from '@angular/core';
import { SimulatorService } from '../../services/simulator-service.service';
import { Simulator } from '../../models/simulator.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-simulator-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simulator-list.component.html',
  styleUrl: './simulator-list.component.scss'
})
export class SimulatorListComponent implements OnInit {
  simulators: Simulator[] = [];

  constructor(
    private readonly simulatorService: SimulatorService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
    this.simulatorService.getAllSimulators().subscribe({
      next: (simulators: Simulator[]) => {
        this.simulators = simulators;
      },
      error: (error: string) => {
        console.error(error);
      }
    });
  }

  editSimulator(id: string): void {
    this.router.navigate(['edit-simulator', id]);
  }
}
