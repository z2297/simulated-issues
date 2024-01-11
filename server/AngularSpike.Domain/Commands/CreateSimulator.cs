using AngularSpike.DataAccess;
using AngularSpike.DataAccess.Models;
using MediatR;

namespace AngularSpike.Domain.Commands
{
    public class CreateSimulator(Simulator simulator) : IRequest<Simulator>
    {
        public Simulator Simulator { get; init; } = simulator;
    }

    public class CreateSimulatorHandler(SpikeInMemoryDbContext context) : IRequestHandler<CreateSimulator, Simulator>
    {
        private readonly SpikeInMemoryDbContext context = context;

        public async Task<Simulator> Handle(CreateSimulator request, CancellationToken cancellationToken)
        {
            context.Database.EnsureCreated();

            var simulator = request.Simulator;
            simulator.Id = Guid.NewGuid();

            context.Simulators.Add(simulator);
            await context.SaveChangesAsync(cancellationToken);

            return simulator;
        }
    }
}
