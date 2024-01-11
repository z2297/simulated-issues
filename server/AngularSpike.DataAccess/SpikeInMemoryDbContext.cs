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

            modelBuilder.Entity<NavigationSection>().HasData(
                new NavigationSection { Id = 1, Name = "Simulator" },
                new NavigationSection { Id = 2, Name = "Project" },
                new NavigationSection { Id = 3, Name = "Issue" }
                );

            modelBuilder.Entity<NavigationProperty>().HasData(
                new NavigationProperty { Id = 1, Name = "Create Simulator", Route = "create-simulator", NavigationSectionId = 1 },
                new NavigationProperty { Id = 2, Name = "All Simulators", Route = "all-simulators", NavigationSectionId = 1 },
                new NavigationProperty { Id = 3, Name = "Edit Simulator", Route = "edit-simulator", NavigationSectionId = 1 },
                new NavigationProperty { Id = 4, Name = "Advanced Search", Route = "project-advanced-search", NavigationSectionId = 2 },
                new NavigationProperty { Id = 5, Name = "Create Project", Route = "create-project", NavigationSectionId = 2 },
                new NavigationProperty { Id = 6, Name = "Advanced Search", Route = "issue-advanced-search", NavigationSectionId = 3 }
                );

            modelBuilder.Entity<Simulator>().HasData(
                new Simulator { Id = Guid.NewGuid(), Name = "Simulator 1", Email = "test@test.com", Address = "123 sim st" },
                new Simulator { Id = Guid.NewGuid(), Name = "Simulator 2", Email = "test@test.com", Address = "123 sim st" }
                );

            base.OnModelCreating(modelBuilder);
        }
    }
}
