import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Simulator } from '../../models/simulator.model';

@Component({
  selector: 'app-simulator-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './simulator-form.component.html',
  styleUrl: './simulator-form.component.scss'
})
export class SimulatorFormComponent implements OnInit {
  @Input() simulator!: Simulator;
  @Output() simulatorCreated: EventEmitter<Simulator> = new EventEmitter<Simulator>();

  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [this.addressValidator]],
    });
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

  get formControls() {
    return this.myForm.controls;
  }

  onSubmit() {
    if (this.myForm.valid) {
      console.log('Form submitted:', this.myForm.value);
    }
  }
}