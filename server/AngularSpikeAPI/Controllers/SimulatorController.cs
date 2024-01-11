using AngularSpike.DataAccess.Models;
using AngularSpike.Domain.Commands;
using AngularSpike.Domain.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AngularSpikeAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SimulatorController(IMediator mediator) : ControllerBase
    {
        private readonly IMediator mediator = mediator;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await mediator.Send(new GetAllSimulators()));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            return Ok(await mediator.Send(new GetSimulator(id)));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Simulator simulator)
        {
            return Ok(await mediator.Send(new CreateSimulator(simulator)));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] Simulator simulator)
        {
            return Ok(await mediator.Send(new UpdateSimulator(simulator)));
        }

    }
}
