using System.Text.Json.Serialization;

namespace RockBackend.Dtos;

public class PaginationDto<T>
{
    [JsonPropertyName("page")]
    public int Page { get; set; }
    [JsonPropertyName("page_size")]
    public int PageSize { get; set; }
    [JsonPropertyName("total_items")]
    public int TotalItens { get; set; }

    [JsonPropertyName("items")]
    public List<T> Items { get; set; }
    public PaginationDto(List<T> items, int page, int pageSize, int totalItems)
    {
        Page = page;
        PageSize = pageSize;
        TotalItens = totalItems;
        Items = items;
    }
}