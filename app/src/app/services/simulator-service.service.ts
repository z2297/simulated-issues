import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Simulator } from '../models/simulator.model';
import { Observable, catchError } from 'rxjs';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  private readonly controller = "simulator";
  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}`;
  }

  getAllSimulators(): Observable<Simulator[]> {
    const url = `${this.baseUrl}/${this.controller}`;

    return this.http.get<Simulator[]>(url).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  getSimulator(id: string): Observable<Simulator> {
    const url = `${this.baseUrl}/${this.controller}/${id}`;

    return this.http.get<Simulator>(url).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  createSimulator(simulator: Simulator): Observable<Simulator> {
    const url = `${this.baseUrl}/${this.controller}`;

    return this.http.post<Simulator>(url, simulator).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }

  updateSimulator(simulator: Simulator): Observable<Simulator> {
    const url = `${this.baseUrl}/${this.controller}`;

    return this.http.put<Simulator>(url, simulator).pipe(
      catchError((error) => {
        console.error('An error occurred:', error);
        throw error;
      })
    );
  }
}
