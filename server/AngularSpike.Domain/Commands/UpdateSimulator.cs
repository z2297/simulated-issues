using AngularSpike.DataAccess;
using AngularSpike.DataAccess.Models;
using MediatR;

namespace AngularSpike.Domain.Commands
{
    public class UpdateSimulator(Simulator simulator) : IRequest<Simulator>
    {
        public Simulator Simulator { get; init; } = simulator;
    }

    public class UpdateSimulatorHandler : IRequestHandler<UpdateSimulator, Simulator>
    {
        private readonly SpikeInMemoryDbContext context;

        public UpdateSimulatorHandler(SpikeInMemoryDbContext context)
        {
            this.context = context;
        }

        public async Task<Simulator> Handle(UpdateSimulator request, CancellationToken cancellationToken)
        {
            context.Database.EnsureCreated();
            var simulator = request.Simulator;

            context.Simulators.Update(simulator);
            await context.SaveChangesAsync(cancellationToken);

            return simulator;
        }
    }
}
