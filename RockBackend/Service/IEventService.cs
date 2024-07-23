using RockBackend.Dtos;

namespace RockBackend.Service;

public interface IEventService
{
    void AddEvent(CreateEventRequest request);
}
