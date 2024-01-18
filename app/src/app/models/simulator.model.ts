export class Simulator {
    id?: string;
    name?: string;
    location?: string;
    destination?: string;
    leadCenter?: string;
    jobNumber?: string;
    status?: string;
    type?: string;
    corporateId?: string;
    shipDate?: string;
    aircraftType?: string;

    constructor(init?: Partial<Simulator>) {
        Object.assign(this, init);
    }
}