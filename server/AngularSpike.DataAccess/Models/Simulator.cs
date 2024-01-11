namespace AngularSpike.DataAccess.Models
{
    public class Simulator
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Address { get; set; }
    }
}
