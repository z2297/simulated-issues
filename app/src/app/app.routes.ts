import { Routes } from '@angular/router';
import { CreateSimulatorComponent } from './components/create-simulator/create-simulator.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'create-simulator', component: CreateSimulatorComponent },
];
