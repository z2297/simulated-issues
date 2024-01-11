namespace AngularSpikeAPI.Models
{
    public class NavigationSection
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public List<NavigationProperty>? NavigationProperties { get; set; }
    }
}
