using RockBackend.Domain.Primitives;
namespace RockBackend.Domain;

public class Event
{
    public int Id { get; private set; }
    public Name Title { get; private set; }
    public Description Description { get; private set; }
    public Location Location { get; private set; }

    public Address Address { get; private set; }

    public ImageModel Image { get; private set; }
    public DateTime Date { get; private set; }

    public List<Band> Bands { get; private set; } = new();

    private Event() { }
    public Event(string title, string description, decimal latitude, decimal longitude, string address, string image, DateTime date)
    {
        Title = new Name(title);
        Description = new Description(description);
        Location = new Location(latitude, longitude);
        Address = new Address(address);
        Image = new ImageModel(image);
        Date = date;
    }

}
