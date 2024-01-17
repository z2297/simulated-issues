import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent,
        RouterTestingModule.withRoutes([
          { path: 'create-simulator', component: SidebarComponent },
        ]),
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close navigation if opened',() => {
    component.expandedSections.push('Issues');
    fixture.detectChanges();

    const button = fixture.debugElement.nativeElement.querySelector('#issue-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#issue-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should initialize with issue navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#issue-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand issue navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#issue-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#issue-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });

  it('should initialize with simulator navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#simulator-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand simulator navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#simulator-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#simulator-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });

  it('should initialize with contact navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#contacts-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand contact navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#contacts-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#contacts-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });

  it('should initialize with permissions navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#permissions-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand permissions navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#permissions-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#permissions-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });

  it('should initialize with comments navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#comments-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand comments navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#comments-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#comments-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });

  it('should initialize with documentation navigation closed', () => {
    const navigation = fixture.debugElement.query(By.css('#documentation-navigation-list')).nativeElement;
    expect(navigation.classList).toContain('hidden');
  });

  it('should expand documentation navigation section', () => {
    const button = fixture.debugElement.nativeElement.querySelector('#documentation-navigation');
    button.click();
    fixture.detectChanges();

    const navigation = fixture.debugElement.query(By.css('#documentation-navigation-list')).nativeElement;
    expect(navigation.classList).not.toContain('hidden');
  });
});
