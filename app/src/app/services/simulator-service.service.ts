import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Simulator } from '../models/simulator.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {

  constructor() { }

  createSimulator(simulator: Simulator): Observable<void> {
    simulator.id = UUID.UUID();

    localStorage.setItem(`simulator-${simulator.id}`, JSON.stringify(simulator));

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  getSimulator(id: string): Observable<Simulator> {
    const item = localStorage.getItem(`simulator-${id}`);

    if (item) {
      const simulator = JSON.parse(item) as Simulator;

      return new Observable<Simulator>(observer => {
        observer.next(simulator);
        observer.complete();
      });
    }

    throw new Error('Simulator not found');
  }

  getAllSimulators(): Observable<Simulator[]> {
    let simulators: Simulator[] = [];
    const simulatorKeys = this.getAllItemsFromLocalStorage('simulator');

    simulatorKeys.forEach(key => {
      let item = localStorage.getItem(key);
      let simulator = JSON.parse(item!) as Simulator;
      simulators.push(simulator);
    });

    return new Observable<Simulator[]>(observer => {
      observer.next(simulators);
      observer.complete();
    });
  }

  updateSimulator(simulator: Simulator): Observable<void> {
    localStorage.removeItem(`simulator-${simulator.id!}`);

    localStorage.setItem(`simulator-${simulator.id!}`, JSON.stringify(simulator));

    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  private getAllItemsFromLocalStorage(prefix: string) {
    const keys = Object.keys(localStorage);
    const filteredKeys = keys.filter(key => key.startsWith(prefix));
    return filteredKeys;
  }
}
