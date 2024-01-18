import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
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
  @Input() simulator?: Simulator;
  @Output() simulatorSaved: EventEmitter<Simulator> = new EventEmitter<Simulator>();

  isLoading: boolean = true;

  simulatorForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }
  ngOnChanges(): void {
    if(this.simulator) {
      this.createForm();
      this.setForm();
      this.isLoading = false;
    }
  }

  createForm(): void {
    this.simulatorForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  setForm(): void {
    this.simulatorForm.controls['name'].setValue(this.simulator!.name);
  }

  setModel(): void {
    this.simulator!.name = this.simulatorForm.controls['name'].value;
  }

  onSubmit(): void {
    if (this.simulatorForm.invalid)
      return;

    this.setModel();
    this.simulatorSaved.emit(this.simulator);
  }
}