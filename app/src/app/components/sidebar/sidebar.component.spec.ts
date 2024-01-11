import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { SidebarService } from '../../services/sidebar-service.service';
import { MockProvider } from 'ng-mocks';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NavigationSection } from '../../models/navigation-section.model';
import { By } from '@angular/platform-browser';
import { NavigationProperty } from '../../models/navigaion-property.model';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  let sidebarService: SidebarService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [MockProvider(SidebarService), MockProvider(Router)]
    })
    .compileComponents();

    sidebarService = TestBed.inject(SidebarService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the navigation sections', () => {
    expect(component.navigationSections).toBeTruthy();
  });

  it('should load the navigation sections on init', () => {
    const navigationSections = getNavigationSections();

    spyOn(sidebarService, 'getSidebarNavigation').and.returnValue(of(navigationSections));

    component.ngOnInit();
    fixture.detectChanges();

    const sections = fixture.debugElement.queryAll(By.css('.section'));

    expect(sections.length).toEqual(navigationSections.length);
  });

  it('should show navigation options when section clicked', () => {
    const navigationSections = getNavigationSections();

    spyOn(sidebarService, 'getSidebarNavigation').and.returnValue(of(navigationSections));

    component.ngOnInit();
    fixture.detectChanges();

    const section = fixture.debugElement.query(By.css(`#section-${navigationSections[0].id}`));
    section.nativeElement.click();

    fixture.detectChanges();

    const navigationProperties = fixture.debugElement.queryAll(By.css('#navigation-property-list.hidden'));

    expect(navigationProperties.length).toEqual(navigationSections.length - 1);
  });

  it('should error when sidebar navigation fails to load', () => {
    spyOn(sidebarService, 'getSidebarNavigation').and.returnValue(throwError(() => 'test error'));
    spyOn(console, 'error');

    component.ngOnInit();
    fixture.detectChanges();

    expect(console.error).toHaveBeenCalled();
  });

  it('should navigate to the route when navigation property clicked', () => {
    const navigationSections = getNavigationSections();

    spyOn(sidebarService, 'getSidebarNavigation').and.returnValue(of(navigationSections));
    spyOn(router, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();

    const section = fixture.debugElement.query(By.css('.section'));
    section.nativeElement.click();

    fixture.detectChanges();

    const navigationProperty = fixture.debugElement.query(By.css('.navigation-property'));
    navigationProperty.nativeElement.click();

    expect(router.navigate).toHaveBeenCalledWith([navigationSections[0].navigationProperties[0].route]);
  });
});

const getNavigationSections = () => [
  new NavigationSection({
    id: 1,
    name: 'Test',
    isExpanded: false,
    navigationProperties: [
      new NavigationProperty({ id: 1, name: 'Test', route: 'test' }),
      new NavigationProperty({ id: 2, name: 'Test 2', route: 'test2' })
    ]
  }),
  new NavigationSection({
    id: 2,
    name: 'Test 2',
    isExpanded: false,
    navigationProperties: [
      new NavigationProperty({ id: 3, name: 'Test 3', route: 'test3' }),
      new NavigationProperty({ id: 4, name: 'Test 4', route: 'test4' })
    ]
  })
];
