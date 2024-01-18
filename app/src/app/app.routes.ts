import { Routes } from '@angular/router';
import { CreateSimulatorComponent } from './components/create-simulator/create-simulator.component';
import { EditSimulatorComponent } from './components/edit-simulator/edit-simulator.component';
import { SimulatorListComponent } from './components/simulator-list/simulator-list.component';
import { SimulatorSearchComponent } from './components/simulator-search/simulator-search.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'create-simulator', component: CreateSimulatorComponent },
    { path: 'edit-simulator/:id', component: EditSimulatorComponent },
    { path: 'simulator-results/:**', component: SimulatorListComponent },
    { path: 'simulator-search', component: SimulatorSearchComponent }
];
