import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulatorSearchComponent } from './simulator-search.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SimulatorSearchComponent', () => {
  let component: SimulatorSearchComponent;
  let fixture: ComponentFixture<SimulatorSearchComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimulatorSearchComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimulatorSearchComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when button clicked', () => {
    jest.spyOn(router, 'navigate').mockImplementation();

    const button = fixture.debugElement.query(By.css('#submit')).nativeElement;
    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['simulator-results', '']);
  });

  it('should build route params', () => {
    jest.spyOn(router, 'navigate').mockImplementation();

    component.selectedSimulator = ['simulator1', 'simulator2'];
    component.selectedLocation = ['location1', 'location2'];
    component.selectedAircraft = ['aircraft1', 'aircraft2'];
    component.selectedJob = ['job1', 'job2'];
    component.selectedAssetNumber = ['assetNumber1', 'assetNumber2'];
    component.selectedSimulatorType = ['simulatorType1', 'simulatorType2'];
    component.selectedDestination = ['destination1', 'destination2'];
    component.selectedSpecialGroups = ['specialGroups1', 'specialGroups2'];
    component.selectedStatus = ['status1', 'status2'];
    component.selectedManufacturer = ['manufacturer1', 'manufacturer2'];
    component.selectedProjectType = ['projectType1', 'projectType2'];
    component.selectedShipDate = ['shipDate1', 'shipDate2'];
    component.selectedLeadCenter = ['leadCenter1', 'leadCenter2'];


    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#submit')).nativeElement;

    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['simulator-results',
      'simulator=simulator1,simulator2&location=location1,location2&aircraft=aircraft1,aircraft2&job=job1,job2&assetNumber=assetNumber1,assetNumber2&simulatorType=simulatorType1,simulatorType2&destination=destination1,destination2&specialGroups=specialGroups1,specialGroups2&status=status1,status2&manufacturer=manufacturer1,manufacturer2&projectType=projectType1,projectType2&shipDate=shipDate1,shipDate2&leadCenter=leadCenter1,leadCenter2'
      ]);
  });

  it('should clear selections', () => {
    component.selectedSimulator = ['simulator1', 'simulator2'];
    component.selectedLocation = ['location1', 'location2'];
    component.selectedAircraft = ['aircraft1', 'aircraft2'];
    component.selectedJob = ['job1', 'job2'];
    component.selectedAssetNumber = ['assetNumber1', 'assetNumber2'];
    component.selectedSimulatorType = ['simulatorType1', 'simulatorType2'];
    component.selectedDestination = ['destination1', 'destination2'];
    component.selectedSpecialGroups = ['specialGroups1', 'specialGroups2'];
    component.selectedStatus = ['status1', 'status2'];
    component.selectedManufacturer = ['manufacturer1', 'manufacturer2'];
    component.selectedProjectType = ['projectType1', 'projectType2'];
    component.selectedShipDate = ['shipDate1', 'shipDate2'];
    component.selectedLeadCenter = ['leadCenter1', 'leadCenter2'];

    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('#clear')).nativeElement;
    button.click();

    expect(component.selectedSimulator).toEqual([]);
    expect(component.selectedLocation).toEqual([]);
    expect(component.selectedAircraft).toEqual([]);
    expect(component.selectedJob).toEqual([]);
    expect(component.selectedAssetNumber).toEqual([]);
    expect(component.selectedSimulatorType).toEqual([]);
    expect(component.selectedDestination).toEqual([]);
    expect(component.selectedSpecialGroups).toEqual([]);
    expect(component.selectedStatus).toEqual([]);
    expect(component.selectedManufacturer).toEqual([]);
    expect(component.selectedProjectType).toEqual([]);
    expect(component.selectedShipDate).toEqual([]);
    expect(component.selectedLeadCenter).toEqual([]);
  });
});
