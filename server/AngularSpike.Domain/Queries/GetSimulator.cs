using AngularSpike.DataAccess;
using AngularSpike.DataAccess.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AngularSpike.Domain.Queries
{
    public class GetSimulator(Guid id) : IRequest<Simulator>
    {
        public Guid Id { get; init; } = id;
    }

    public class GetSimulatorHandler : IRequestHandler<GetSimulator, Simulator>
    {
        private readonly SpikeInMemoryDbContext context;

        public GetSimulatorHandler(SpikeInMemoryDbContext context)
        {
            this.context = context;
        }

        public async Task<Simulator> Handle(GetSimulator request, CancellationToken cancellationToken)
        {
            context.Database.EnsureCreated();
            return await context.Simulators.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken) ?? throw new Exception();
        }
    }
}
