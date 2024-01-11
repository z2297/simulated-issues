import { NavigationProperty } from "./navigaion-property.model";

fdescribe('NavigationProperty', () => {
    it('should create an instance', () => {
        expect(new NavigationProperty()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        let navigationProperty = new NavigationProperty({
            id: 1,
            name: 'test',
            route: 'test'
        });
        expect(navigationProperty.id).toEqual(1);
        expect(navigationProperty.name).toEqual('test');
        expect(navigationProperty.route).toEqual('test');
    });
});