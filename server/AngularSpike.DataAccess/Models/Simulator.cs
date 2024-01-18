namespace AngularSpike.DataAccess.Models
{
    public class Simulator
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Location { get; set; }
        public required string Destination {get; set;}
        public required string LeadCenter {get; set;}
        public required string JobNumber {get; set;}
        public required string Status {get; set;}
        public required string Type {get; set;}
        public required string CorporateId {get; set;}
        public required string ShipDate {get; set;}
        public required string AircraftType { get; set; }
    }
}
