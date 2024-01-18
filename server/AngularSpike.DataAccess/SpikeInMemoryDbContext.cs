using AngularSpike.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace AngularSpike.DataAccess
{
    public class SpikeInMemoryDbContext(DbContextOptions<SpikeInMemoryDbContext> options) : DbContext(options)
    {
        public DbSet<NavigationSection> NavigationSections { get; set; }
        public DbSet<NavigationProperty> NavigationProperties { get; set; }
        public DbSet<Simulator> Simulators { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NavigationSection>().HasMany(x => x.NavigationProperties)
                .WithOne(x => x.NavigationSection)
                .HasForeignKey(x => x.NavigationSectionId);

            modelBuilder.Entity<NavigationProperty>().HasOne(x => x.NavigationSection)
                .WithMany(x => x.NavigationProperties)
                .HasForeignKey(x => x.NavigationSectionId);

            modelBuilder.Entity<Simulator>().HasData(
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator1",
                    Location = "Simulation Center A",
                    Destination = "Airport X",
                    LeadCenter = "Training Facility 1",
                    JobNumber = "JN001",
                    Status = "Active",
                    Type = "Flight",
                    CorporateId = "Corp001",
                    ShipDate = "2024-01-18",
                    AircraftType = "Boeing 737"
                },
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator2",
                    Location = "Simulation Center B",
                    Destination = "Airport Y",
                    LeadCenter = "Training Facility 2",
                    JobNumber = "JN002",
                    Status = "Inactive",
                    Type = "Driving",
                    CorporateId = "Corp002",
                    ShipDate = "2024-01-19",
                    AircraftType = "Airbus A320"
                },
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator3",
                    Location = "Simulation Center C",
                    Destination = "Airport Z",
                    LeadCenter = "Training Facility 3",
                    JobNumber = "JN003",
                    Status = "Maintenance",
                    Type = "Space",
                    CorporateId = "Corp003",
                    ShipDate = "2024-01-20",
                    AircraftType = "Space Shuttle"
                },
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator4",
                    Location = "Simulation Center D",
                    Destination = "Space Station Alpha",
                    LeadCenter = "Training Facility 4",
                    JobNumber = "JN004",
                    Status = "Ready",
                    Type = "Space",
                    CorporateId = "Corp004",
                    ShipDate = "2024-01-21",
                    AircraftType = "International Space Station"
                },
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator5",
                    Location = "Simulation Center E",
                    Destination = "Port A",
                    LeadCenter = "Training Facility 5",
                    JobNumber = "JN005",
                    Status = "Active",
                    Type = "Marine",
                    CorporateId = "Corp005",
                    ShipDate = "2024-01-22",
                    AircraftType = "Submarine"
                },
                new Simulator
                {
                    Id = Guid.NewGuid(),
                    Name = "Simulator6",
                    Location = "Simulation Center F",
                    Destination = "Harbor B",
                    LeadCenter = "Training Facility 6",
                    JobNumber = "JN006",
                    Status = "Inactive",
                    Type = "Marine",
                    CorporateId = "Corp006",
                    ShipDate = "2024-01-23",
                    AircraftType = "Cargo Ship"
                }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
