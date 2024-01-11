import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Simulator } from '../../models/simulator.model';

@Component({
  selector: 'app-simulator-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './simulator-form.component.html',
  styleUrl: './simulator-form.component.scss'
})
export class SimulatorFormComponent implements OnChanges {
  @Input() simulator!: Simulator;
  @Output() simulatorCreated: EventEmitter<Simulator> = new EventEmitter<Simulator>();

  simulatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges(): void {
    this.createForm();
    this.setForm();
  }

  addressValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const numbers = value.match(/\d/g) ?? [];
    const spaces = value.match(/\s\w/g) ?? [];

    if (numbers.length >= 2 && spaces.length >= 2) {
      return null;
    } else {
      return { 'validAddress': true };
    }
  }

  createForm(): void {
    this.simulatorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [this.addressValidator]],
    });
  }

  setForm(): void {
    this.simulatorForm.controls['address'].setValue(this.simulator.address);
    this.simulatorForm.controls['email'].setValue(this.simulator.email);
    this.simulatorForm.controls['name'].setValue(this.simulator.name);
  }

  setModel(): void {
    this.simulator.address = this.simulatorForm.controls['address'].value;
    this.simulator.email = this.simulatorForm.controls['email'].value;
    this.simulator.name = this.simulatorForm.controls['name'].value;
  }

  onSubmit(): void {
    if (this.simulatorForm.invalid)
      return;

    this.setModel();
    this.simulatorCreated.emit(this.simulator);
  }
}