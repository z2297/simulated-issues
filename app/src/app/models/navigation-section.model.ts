import { NavigationProperty } from "./navigaion-property.model";

export class NavigationSection {
    id!: number;
    name!: string;
    isExpanded: boolean = false;
    navigationProperties: NavigationProperty[] = [];

    constructor(init?: Partial<NavigationSection>) {
        Object.assign(this, init);
    }
}