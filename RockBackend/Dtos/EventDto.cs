using System.Text.Json.Serialization;

namespace RockBackend.Dtos;

public class CreateEventRequest
{
    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;

    [JsonPropertyName("position")]
    public LocationRequest Location { get; set; } = new LocationRequest();

    [JsonPropertyName("datetime")]
    public DateTime Date { get; set; } = DateTime.Now;

    [JsonPropertyName("bands")]
    public List<string> Bands { get; set; } = new List<string>();

    [JsonPropertyName("image")]
    public string Image { get; set; } = string.Empty;
}

public class LocationRequest
{
    [JsonPropertyName("lat")]
    public decimal Latitude { get; set; } 
    [JsonPropertyName("lng")]
    public decimal Longitude { get; set; } 
}