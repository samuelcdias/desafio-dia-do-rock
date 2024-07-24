using System.Text.Json.Serialization;

namespace RockBackend.Dtos;

public class EventDto
{
    [JsonPropertyName("id")]
    public int? Id { get; set; } = null;

    [JsonPropertyName("title")]
    public string Title { get; set; } = string.Empty;

    [JsonPropertyName("description")]
    public string Description { get; set; } = string.Empty;
    
    [JsonPropertyName("address")]
    public string Address { get; set; } = string.Empty;

    [JsonPropertyName("position")]
    public LocationDto Location { get; set; } = new LocationDto();

    [JsonPropertyName("datetime")]
    public string Date { get; set; } = DateTime.Now.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ssZ");

    [JsonPropertyName("bands")]
    public List<string> Bands { get; set; } = new List<string>();

    [JsonPropertyName("image")]
    public string Image { get; set; } = string.Empty;
}

public class LocationDto
{
    [JsonPropertyName("lat")]
    public decimal Latitude { get; set; } 
    [JsonPropertyName("lng")]
    public decimal Longitude { get; set; } 
}