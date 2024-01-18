import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-simulator-search',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './simulator-search.component.html',
  styleUrl: './simulator-search.component.scss'
})
export class SimulatorSearchComponent {
  constructor(private readonly router: Router) { }
  navigate(): void {
    this.router.navigate(['all-simulators']);
  }
}
