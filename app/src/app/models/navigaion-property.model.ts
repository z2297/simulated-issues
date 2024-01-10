export class NavigationProperty {
    id!: number;
    name!: string;
    route!: string;

    constructor(init? : Partial<NavigationProperty>) {
        Object.assign(this, init);
    }
}