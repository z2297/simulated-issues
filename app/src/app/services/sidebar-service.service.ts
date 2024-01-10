import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable, catchError } from 'rxjs';
import { NavigationProperty } from '../models/navigaion-property.model';
import { NavigationSection } from '../models/navigation-section.model';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.apiUrl}`;
  }
  private readonly controller = "navigation";
  private readonly baseUrl: string;

  getSidebarNavigation(): Observable<NavigationSection[]> {
    const url = `${this.baseUrl}/${this.controller}`;

    // return this.http.get<NavigationSection[]>(url).pipe(
    //   catchError((error) => {
    //     console.error('An error occurred:', error);
    //     throw error;
    //   })
    // );

    return new Observable<NavigationSection[]>(observer => {
      const navigationSections: NavigationSection[] = NavigationSection.getNavigationSections();

      observer.next(navigationSections);
      observer.complete();
    });
  }
}
