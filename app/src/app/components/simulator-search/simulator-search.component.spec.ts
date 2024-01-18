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
    spyOn(router, 'navigate');

    const button = fixture.debugElement.query(By.css('#submit')).nativeElement;
    button.click();

    expect(router.navigate).toHaveBeenCalledWith(['all-simulators']);
  });
});
