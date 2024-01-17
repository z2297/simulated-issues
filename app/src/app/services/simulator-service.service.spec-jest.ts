import { TestBed } from '@angular/core/testing';

import { SimulatorService } from './simulator-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { Simulator } from '../models/simulator.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('SimulatorServiceService', () => {
  let service: SimulatorService;

  let http: HttpTestingController;
  let baseUrl = '';
  let controller = 'simulator';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimulatorService]
    });

    jest.spyOn(console, 'error').mockImplementation();

    environment.apiUrl = 'http://localhost:3000';
    baseUrl = `${environment.apiUrl}/${controller}`;

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SimulatorService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return simulator', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}/${simulator.id}`;

    service.getSimulator(simulator.id!).subscribe({
      next: (data) => {
        expect(data).toEqual(simulator);
        done();
      },
      error: (_) => {
        fail('Should not have errored');
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(simulator);
  });

  it('get should throw error', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}/${simulator.id}`;

    service.getSimulator(simulator.id!).subscribe({
      next: (_) => {
        fail('Should not have succeeded');
      },
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(
      null,
      new HttpErrorResponse({
        status: 500,
        statusText: 'test error',
      }),
    );
  });

  it('getAll should return simulators', (done: jest.DoneCallback) => {
    const simulators = [
      new Simulator({ id: '1', name: 'test' }),
      new Simulator({ id: '2', name: 'test' }),
    ];
    const url = `${baseUrl}`;

    service.getAllSimulators().subscribe({
      next: (data) => {
        expect(data).toEqual(simulators);
        done();
      },
      error: (_) => {
        fail('Should not have errored');
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(simulators);
  });

  it('getAll should throw error', (done: jest.DoneCallback) => {
    const simulators = [
      new Simulator({ id: '1', name: 'test' }),
      new Simulator({ id: '2', name: 'test' }),
    ];
    const url = `${baseUrl}`;

    service.getAllSimulators().subscribe({
      next: (_) => {
        fail('Should not have succeeded');
      },
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(
      null,
      new HttpErrorResponse({
        status: 500,
        statusText: 'test error',
      }),
    );
  });

  it('create should return simulator', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}`;

    service.createSimulator(simulator).subscribe({
      next: (data) => {
        expect(data).toEqual(simulator);
        done();
      },
      error: (_) => {
        fail('Should not have errored');
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(simulator);
  });

  it('create should throw error', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}`;

    service.createSimulator(simulator).subscribe({
      next: (_) => {
        fail('Should not have succeeded');
      },
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('POST');
    req.flush(
      null,
      new HttpErrorResponse({
        status: 500,
        statusText: 'test error',
      }),
    );
  });

  it('update should return simulator', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}`;

    service.updateSimulator(simulator).subscribe({
      next: (data) => {
        expect(data).toEqual(simulator);
        done();
      },
      error: (_) => {
        fail('Should not have errored');
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(simulator);
  });

  it('update should throw error', (done: jest.DoneCallback) => {
    const simulator = new Simulator({ id: '1', name: 'test' });
    const url = `${baseUrl}`;

    service.updateSimulator(simulator).subscribe({
      next: (_) => {
        fail('Should not have succeeded');
      },
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('PUT');
    req.flush(
      null,
      new HttpErrorResponse({
        status: 500,
        statusText: 'test error',
      }),
    );
  });
});
