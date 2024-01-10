import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-simulator',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './create-simulator.component.html',
  styleUrl: './create-simulator.component.scss'
})
export class CreateSimulatorComponent implements OnInit {
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
    const numbers = value.match(/\d/g);
    const words = value.match(/[a-zA-Z]/g);
    if (numbers && numbers.length >= 2 && words && words.length >= 2) {
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