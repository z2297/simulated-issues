import { NavigationProperty } from "./navigaion-property.model";
import { NavigationSection } from "./navigation-section.model";

fdescribe('NavigationSection', () => {
    it('should create an instance', () => {
        expect(new NavigationSection()).toBeTruthy();
    });

    it('should accept values in the constructor', () => {
        let navigationSection = new NavigationSection({
            id: 1,
            name: 'test',
            navigationProperties: [ new NavigationProperty({ id: 1, name: 'test', route: 'test' }) ]
        });
        expect(navigationSection.id).toEqual(1);
        expect(navigationSection.name).toEqual('test');
        expect(navigationSection.navigationProperties.length).toEqual(1);
    });
});