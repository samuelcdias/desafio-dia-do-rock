namespace RockBackend.Domain;

public class Location
{
    public decimal Latitude { get; private set; }
    public decimal Longitude { get; private set; }
    private Location() { }

    public Location(decimal latitude, decimal longitude)
    {
        if (latitude < -90 || latitude > 90)
        {
            throw new ArgumentOutOfRangeException(nameof(latitude));
        }
        if (longitude < -180 || longitude > 180)
        {
            throw new ArgumentOutOfRangeException(nameof(longitude));
        }
        Latitude = latitude;
        Longitude = longitude;
    }
    public override string ToString() => $"{Latitude}, {Longitude}";
}
