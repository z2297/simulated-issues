import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Simulator } from '../models/simulator.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulatorServiceService {

  constructor() { }

  createSimulator(simulator: Simulator): Observable<void> {
    simulator.id = UUID.UUID();

    localStorage.setItem('simulator', JSON.stringify(simulator));

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  getSimulator(id: string): Observable<Simulator> {
    const simulators = localStorage.getItem('simulator');

    if (simulators) {
      const simulator = JSON.parse(simulators) as Simulator;
      if (simulator.id === id) {
        return new Observable<Simulator>(observer => {
          observer.next(simulator);
          observer.complete();
        });
      }
    }

    throw new Error('Simulator not found');
  }
}
