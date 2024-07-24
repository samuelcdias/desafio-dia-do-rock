using RockBackend.Dtos;

namespace RockBackend.Service;

public interface IEventService
{
    Task AddEvent(EventDto request);
    Task<PaginationDto<EventDto>> GetEvents(string? filtro = null, int page= 0);
}
