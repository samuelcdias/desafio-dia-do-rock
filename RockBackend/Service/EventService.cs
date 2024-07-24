using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using RockBackend.Data;
using RockBackend.Domain;
using RockBackend.Domain.Primitives;
using RockBackend.Dtos;

namespace RockBackend.Service;

public class EventService : IEventService
{
    private readonly AppDBContext _context;

    public EventService(AppDBContext appDBContext)
    {
        _context = appDBContext;
    }
    /// <summary>
    /// Adiciona um evento
    /// </summary>
    /// <exception cref="Exception">Evento inválido</exception>
    /// <param name="request"></param>
    public async Task AddEvent(EventDto request)
    {
        var model = new EventModel(request.Title, request.Description, request.Location.Latitude, request.Location.Longitude, request.Address, request.Image, request.Date);

        var bands = new List<BandModel>();
        foreach (var band in request.Bands)
        {
            bands.Add(new BandModel(band));
        }

        var modelData = new Event()
        {
            Title = model.Title.Value, 
            Description = model.Description.Value,
            Latitude = model.Location.Latitude,
            Longitude = model.Location.Longitude,
            Address = model.Address.Name.Value
        };

        await _context.Eventos.AddAsync(modelData);

        var imageData = new Image() {
            EventId = modelData.Id,
            Url = model.Image
        };

        await _context.Imagens.AddAsync(imageData);

        var bandsData = bands.Select(band => new Band() { Nome = band.BandaNome.Value }).ToList();

        await _context.Bandas.AddRangeAsync(bandsData);

        var eventBands = bandsData.Select(band => new EventBand()
        {
            EventId = modelData.Id,
            BandId = band.Id
        });

        await _context.EventBands.AddRangeAsync(eventBands);

    }

    public async Task<PaginationDto<EventDto>> GetEvents(string filtro, int page)
    {
        const int pageSize = 10;

        var query = from e in _context.Eventos
                    join i in _context.Imagens
                        on e.Id equals i.EventId
                    where e.Title.Contains(filtro)
                        || e.Description.Contains(filtro)
                        || e.Address.Contains(filtro)
                    select new EventDto()
                    {
                        Id = e.Id,
                        Address = e.Address,
                        Date = DateTime.ParseExact(e.Date, "yyyy-MM-ddTHH:mm:ss.zzz", null).ToString("dd/MM/yyyy HH:mm"),
                        Description = e.Description,
                        Image = i.Url,
                        Title = e.Title,
                    };
        var queryBands = from e in query
                         join eb in _context.EventBands
                             on e.Id equals eb.EventId
                         join b in _context.Bandas
                             on eb.BandId equals b.Id
                         group eb by eb.EventId into g
                         select new EventDto
                         {
                             Id = g.Key,
                             Address = g.First().Event.Address,
                             Date = g.First().Event.Date,
                             Description = g.First().Event.Description,
                             Image = g.First().Event.Image.Url,
                             Title = g.First().Event.Title,
                             Bands = g.Select(b => b.Band.Nome).ToList()
                         };
        var count = await queryBands.CountAsync();
        var items = await queryBands.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();

        return new PaginationDto<EventDto>(items, page, pageSize, count);


    }
}
