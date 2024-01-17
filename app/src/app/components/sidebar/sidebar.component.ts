import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service.service';
import { NavigationSection } from '../../models/navigation-section.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  expandedSections: any[] = [];  

  expandNavigationSection(section: any): void {
    if(this.sectionExpanded(section)) {
      this.removeSectionFromExpandedList(section);
      return;
    }

    this.expandedSections.push(section);
  }

  isExpanded(section: any): boolean {
    return this.sectionExpanded(section);
  }

  private sectionExpanded(section: any): boolean {
    return this.expandedSections.findIndex(s => s === section) !== -1;
  }

  private removeSectionFromExpandedList(section: any): void {
    const index = this.expandedSections.findIndex(s => s === section);
    this.expandedSections.splice(index, 1);
  }
}