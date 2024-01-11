var builder = WebApplication.CreateBuilder(args);
var DevelopmentOrigins = "DevelopmentOrigins";

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: DevelopmentOrigins, builder =>
    {
        builder.WithOrigins("http://localhost:4200")
                             .AllowAnyHeader()
                             .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(DevelopmentOrigins);
app.UseAuthorization();

app.MapControllers();

app.Run();
