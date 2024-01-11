import { Routes } from '@angular/router';
import { CreateSimulatorComponent } from './components/create-simulator/create-simulator.component';
import { EditSimulatorComponent } from './components/edit-simulator/edit-simulator.component';
import { SimulatorListComponent } from './components/simulator-list/simulator-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'create-simulator', component: CreateSimulatorComponent },
    { path: 'edit-simulator/:id', component: EditSimulatorComponent },
    { path: 'all-simulators', component: SimulatorListComponent }
];
