import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../../services/sidebar-service.service';
import { NavigationSection } from '../../models/navigation-section.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {
  constructor(private readonly navigationService: SidebarService, private readonly router: Router) {}

  isCollapsed: boolean = false;
  activeSection: string = '';

  navigationSections: NavigationSection[] = [];

  ngOnInit(): void {
    this.navigationService.getSidebarNavigation().subscribe({
      next: (navigationSections: NavigationSection[]) => {
        this.navigationSections = navigationSections;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      }
    });
  }

  toggleSection(section: number): void {
    this.navigationSections.forEach(navSection => {
      if (navSection.id !== section) {
        navSection.isExpanded = false;
      } else {
        navSection.isExpanded = true;
      }
    });
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}