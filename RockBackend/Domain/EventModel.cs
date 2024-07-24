using RockBackend.Domain.Primitives;
namespace RockBackend.Domain;

public class EventModel
{
    public int Id { get; private set; }
    public Name Title { get; private set; }
    public Description Description { get; private set; }
    public Location Location { get; private set; }

    public Address Address { get; private set; }

    public string Image { get; private set; }
    public DateTime Date { get; private set; }

    public List<BandModel> Bands { get; set; } = new();

    private EventModel() { }
    public EventModel(string title, string description, decimal latitude, decimal longitude, string address, string image, string date)
    {
        Title = new Name(title);
        Description = new Description(description);
        Location = new Location(latitude, longitude);
        Address = new Address(address);
        Image = image;
        Date = DateTime.ParseExact(date, "yyyy-MM-ddTHH:mm:ss.fffZ", null);
    }

}
