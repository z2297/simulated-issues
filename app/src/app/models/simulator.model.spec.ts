import { Simulator } from "./simulator.model";

fdescribe('Simulator', () => {
    it('should create an instance', () => {
        expect(new Simulator()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        let simulator = new Simulator({
            id: '1',
            name: 'test',
            email: 'test',
            address: 'test'
        });
        expect(simulator.id).toEqual('1');
        expect(simulator.name).toEqual('test');
        expect(simulator.email).toEqual('test');
        expect(simulator.address).toEqual('test');
    });
});