export class Simulator {
    id?: string;
    name!: string;
    email!: string;
    address!: string;

    constructor(init?: Partial<Simulator>) {
        Object.assign(this, init);
    }
}