import { NavigationProperty } from "./navigaion-property.model";

export class NavigationSection {
    id!: number;
    name!: string;
    isExpanded: boolean = false;
    navigationProperties: NavigationProperty[] = [];

    static getNavigationSections(): NavigationSection[] {
        return [
            new NavigationSection({
              id: 1,
              name: 'Simulators',
              navigationProperties: [
                new NavigationProperty({ id: 1, name: 'Create Simulator', route: 'create-simulator' }),
                new NavigationProperty({ id: 2, name: 'All Simulators', route: 'all-simulators' }),
                new NavigationProperty({ id: 3, name: 'Create Simulator', route: 'create-simulator' }),
              ]}),
            new NavigationSection({
              id: 2,
              name: 'Projects',
              navigationProperties: [
                new NavigationProperty({ id: 1, name: 'Advanced Search', route: 'project-advanced-search' }),
                new NavigationProperty({ id: 2, name: 'Create Project', route: 'create-project' }),
              ]}),
            new NavigationSection({
              id: 3,
              name: 'Issues',
              navigationProperties: [
                new NavigationProperty({ id: 1, name: 'Advanced Search', route: 'issue-advanced-search' }),
                new NavigationProperty({ id: 2, name: 'Create Issue', route: 'create-issue' }),
              ]}),
          ];
    }

    constructor(init?: Partial<NavigationSection>) {
        Object.assign(this, init);
    }
}