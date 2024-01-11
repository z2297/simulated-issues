using AngularSpike.DataAccess;
using AngularSpike.DataAccess.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AngularSpike.Domain.Queries
{
    public class GetAllSimulators : IRequest<IEnumerable<Simulator>>
    {
    }

    public class GetAllSimulatorsHandler : IRequestHandler<GetAllSimulators, IEnumerable<Simulator>>
    {
        private readonly SpikeInMemoryDbContext context;

        public GetAllSimulatorsHandler(SpikeInMemoryDbContext context)
        {
            this.context = context;
        }

        public async Task<IEnumerable<Simulator>> Handle(GetAllSimulators request, CancellationToken cancellationToken)
        {
            context.Database.EnsureCreated();
            return await context.Simulators.ToListAsync(cancellationToken);
        }
    }
}
