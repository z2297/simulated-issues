import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-simulator-search',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './simulator-search.component.html',
  styleUrl: './simulator-search.component.scss'
})
export class SimulatorSearchComponent {
  selectedSimulator: string[] = [];
  selectedLocation: string[] = [];
  selectedAircraft: string[] = [];
  selectedJob: string[] = [];
  selectedAssetNumber: string[] = [];
  selectedSimulatorType: string[] = [];
  selectedDestination: string[] = [];
  selectedSpecialGroups: string[] = [];
  selectedStatus: string[] = [];
  selectedManufacturer: string[] = [];
  selectedProjectType: string[] = [];
  selectedShipDate: string[] = [];
  selectedLeadCenter: string[] = [];


  constructor(private readonly router: Router) { }

  navigate(): void {
    this.router.navigate(['simulator-results', this.buildRouteParams()]);
  }

  buildRouteParams(): string {
    const params: string[] = [];
    this.buildSimulatorParams(params);
    this.buildLocationParams(params);
    this.buildAircraftParams(params);
    this.buildJobParams(params);
    this.buildAssetNumberParams(params);
    this.buildSimulatorTypeParams(params);
    this.buildDestinationParams(params);
    this.buildSpecialGroupParams(params);
    this.buildStatusParams(params);
    this.buildManufacturerParams(params);
    this.buildProjectTypeParams(params);
    this.buildShipDateParams(params);
    this.buildLeadCenterParams(params);
    return params.join('&');
  }

  clear(): void {
    this.selectedSimulator = [];
    this.selectedLocation = [];
    this.selectedAircraft = [];
    this.selectedJob = [];
    this.selectedAssetNumber = [];
    this.selectedSimulatorType = [];
    this.selectedDestination = [];
    this.selectedSpecialGroups = [];
    this.selectedStatus = [];
    this.selectedManufacturer = [];
    this.selectedProjectType = [];
    this.selectedShipDate = [];
    this.selectedLeadCenter = [];
  }

  private buildLeadCenterParams(params: string[]) {
    if (this.selectedLeadCenter.length > 0) {
      params.push(`leadCenter=${this.selectedLeadCenter.join(',')}`);
    }
  }

  private buildShipDateParams(params: string[]) {
    if (this.selectedShipDate.length > 0) {
      params.push(`shipDate=${this.selectedShipDate.join(',')}`);
    }
  }

  private buildProjectTypeParams(params: string[]) {
    if (this.selectedProjectType.length > 0) {
      params.push(`projectType=${this.selectedProjectType.join(',')}`);
    }
  }

  private buildManufacturerParams(params: string[]) {
    if (this.selectedManufacturer.length > 0) {
      params.push(`manufacturer=${this.selectedManufacturer.join(',')}`);
    }
  }

  private buildStatusParams(params: string[]) {
    if (this.selectedStatus.length > 0) {
      params.push(`status=${this.selectedStatus.join(',')}`);
    }
  }

  private buildSpecialGroupParams(params: string[]) {
    if (this.selectedSpecialGroups.length > 0) {
      params.push(`specialGroups=${this.selectedSpecialGroups.join(',')}`);
    }
  }

  private buildDestinationParams(params: string[]) {
    if (this.selectedDestination.length > 0) {
      params.push(`destination=${this.selectedDestination.join(',')}`);
    }
  }

  private buildSimulatorTypeParams(params: string[]) {
    if (this.selectedSimulatorType.length > 0) {
      params.push(`simulatorType=${this.selectedSimulatorType.join(',')}`);
    }
  }

  private buildAssetNumberParams(params: string[]) {
    if (this.selectedAssetNumber.length > 0) {
      params.push(`assetNumber=${this.selectedAssetNumber.join(',')}`);
    }
  }

  private buildJobParams(params: string[]) {
    if (this.selectedJob.length > 0) {
      params.push(`job=${this.selectedJob.join(',')}`);
    }
  }

  private buildAircraftParams(params: string[]) {
    if (this.selectedAircraft.length > 0) {
      params.push(`aircraft=${this.selectedAircraft.join(',')}`);
    }
  }

  private buildLocationParams(params: string[]) {
    if (this.selectedLocation.length > 0) {
      params.push(`location=${this.selectedLocation.join(',')}`);
    }
  }

  private buildSimulatorParams(params: any[]) {
    if (this.selectedSimulator.length > 0) {
      params.push(`simulator=${this.selectedSimulator.join(',')}`);
    }
  }

}
