using AngularSpikeAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity.Core;

namespace AngularSpikeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SimulatorController : ControllerBase
    {
        private readonly List<Simulator> simulators;
        public SimulatorController() 
        {
            simulators =
            [
                new() { Id = Guid.Parse("7c641313-6c6a-4d00-9941-ad576f5d1475"), Name = "Simulator 1", Email = "Simulator1@sim.com", Address = "123 sim street" },
                new() { Id = Guid.Parse("811fd984-1804-4a9a-9bf1-907477e51369"), Name = "Simulator 2", Email = "Simulator2@sim.com", Address = "456 sim street" },
                new() { Id = Guid.Parse("f677e884-50c5-40c5-89bf-fecdadda4b79"), Name = "Simulator 3", Email = "Simulator3@sim.com", Address = "789 sim street" },
                new() { Id = Guid.Parse("b6cfdf4a-50e1-4bf1-b702-0c1f76b27b3b"), Name = "Simulator 4", Email = "Simulato4@sim.com", Address = "012 sim street" },
            ];
        }

        [HttpGet]
        public IEnumerable<Simulator> GetAll()
        {
            return simulators;
        }

        [HttpGet("{id}")]
        public Simulator Get(Guid id)
        {
            return simulators.FirstOrDefault(s => s.Id == id) ?? throw new ObjectNotFoundException();
        }

        [HttpPost]
        public Simulator Create([FromBody] Simulator simulator)
        {
            simulator.Id = Guid.NewGuid();
            simulators.Add(simulator);

            return simulator;
        }

        [HttpPut]
        public Simulator Update([FromBody] Simulator simulator)
        {
            var simulatorToUpdate = simulators.FirstOrDefault(s => s.Id == simulator.Id) ?? throw new ObjectNotFoundException();
            simulatorToUpdate.Name = simulator.Name;
            simulatorToUpdate.Email = simulator.Email;
            simulatorToUpdate.Address = simulator.Address;

            return simulatorToUpdate;
        }

    }
}
