import { TestBed } from '@angular/core/testing';
import { SidebarService } from './sidebar-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { NavigationSection } from '../models/navigation-section.model';


describe('SidebarServiceService', () => {
  let service: SidebarService;

  let http: HttpTestingController;
  let baseUrl = '';
  let controller = 'navigation';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SidebarService]
    });

    jest.spyOn(console, 'error').mockImplementation();

    environment.apiUrl = 'http://localhost:3000';
    baseUrl = `${environment.apiUrl}/${controller}`;

    http = TestBed.inject(HttpTestingController);
    service = TestBed.inject(SidebarService);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should return navigation', (done: DoneFn) => {
    const navigation = [new NavigationSection({ id: 1, name: 'test' })];
    const url = `${baseUrl}`;

    service.getSidebarNavigation().subscribe({
      next: (data) => {
        expect(data).toEqual(navigation);
        done();
      },
      error: (_) => {
        fail('Should not have errored');
      }
    });

    const req = http.expectOne(url);
    expect(req.request.method).toEqual('GET');
    req.flush(navigation);
  });

  it('get should throw error', (done: DoneFn) => {
    const navigation = [{ id: '1', name: 'test' }];
    const url = `${baseUrl}`;

    service.getSidebarNavigation().subscribe({
      next: (_) => {
        fail('Should not have errored');
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
});
