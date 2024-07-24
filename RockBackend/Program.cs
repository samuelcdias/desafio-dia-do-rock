using Microsoft.EntityFrameworkCore;
using RockBackend.Data;
using RockBackend.Dtos;
using RockBackend.Service;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<AppDBContext>(
    options => options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
        )
    );
builder.Services.AddTransient<AppDBContext>();
builder.Services.AddScoped<IEventService, EventService>();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapPost("/eventos", async (EventDto request, IEventService service) =>
{
    try
    {
        await service.AddEvent(request);
        return Results.Created();
    } catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
})
.WithName("Criar Eventos")
.WithOpenApi();

app.MapGet("/eventos", async(IEventService service, string ? filter = null, int page = 1) =>
{
    try
    {
        var result = await service.GetEvents(filter, page);
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        return Results.BadRequest(ex.Message);
    }
})
.WithName("Obter Eventos")
.WithOpenApi();

app.Run();
