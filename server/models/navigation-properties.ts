export class navigationProperties {
    static getNavigationProperties(): navigationProperty[] {
        return [
            new navigationProperty({ id: 1, name: 'Home' }),
            new navigationProperty({ id: 2, name: 'About' }),
            new navigationProperty({ id: 3, name: 'Contact' }),
            new navigationProperty({ id: 4, name: 'Login' }),
        ];
    }
}

class navigationProperty {
    id: number = 0;
    name: string = '';

    constructor(init?: Partial<navigationProperty>) {
        Object.assign(this, init);
    }
}