namespace AngularSpike.DataAccess.Models
{
    public class NavigationProperty
    {
        public required int Id { get; set; }
        public required string Name { get; set; }
        public required string Route { get; set; }
        public int? NavigationSectionId { get; set; }
        public NavigationSection? NavigationSection { get; set; }
    }
}
