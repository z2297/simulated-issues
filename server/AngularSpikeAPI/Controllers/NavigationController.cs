using AngularSpikeAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AngularSpikeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NavigationController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<NavigationSection> Get()
        {
            return new List<NavigationSection>
            {
                  new() 
                  {
                        Id = 1,
                        Name = "Simulators",
                        NavigationProperties =
                        [
                            new() { Id = 1, Name = "Create Simulator", Route = "create-simulator" },
                            new() { Id = 2, Name = "All Simulators", Route = "all-simulators" },
                            new() { Id = 3, Name = "Edit Simulator", Route = "edit-simulator" },
                        ]
                  },
                  new()
                  {
                        Id = 2,
                        Name = "Projects",
                        NavigationProperties =
                        [
                            new() { Id = 1, Name = "Advanced Search", Route = "project-advanced-search" },
                            new() { Id = 2, Name = "Create Project", Route = "create-project" },
                        ]
                  },
                  new()
                  {
                        Id = 3,
                        Name = "Issues",
                        NavigationProperties =
                        [
                            new() { Id = 1, Name = "Advanced Search", Route = "issue-advanced-search" },
                            new() { Id = 2, Name = "Create Issue", Route = "create-issue" },
                        ]
                  }
            };
        }   
    }
}
