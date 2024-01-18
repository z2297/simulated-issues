import { Simulator } from "./simulator.model";

describe('Simulator', () => {
    it('should create an instance', () => {
        expect(new Simulator()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        let simulator = new Simulator({
            id: '1',
            name: 'test',
        });
        expect(simulator.id).toEqual('1');
        expect(simulator.name).toEqual('test');
    });
});